<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { useCounterStore } from "@/stores/counter";
import ToastFormError from "@/components/ToastFormError.vue";
// import { STOCKS, STOCKLength } from "@/stocks";
import { show_input_info } from "./SignIn.vue";

document.title = "If I Had Invested - Eric Nyaga";

/**the totalnumber of stocks fetched from the server */
const numberOfStocks = ref(0);
/**The list of stocks fetched from the server */
const fetchedStocks: Ref<string[][]> = ref([]);
/**The list of stocks that will be displayed to the user */
const stockList: Ref<string[][]> = ref([]);

/**Vue only allows using useRouter() on the setup block level */
const navigator = useRouter();
/**The form that the use will fill to provide data for computing total earnings */
const form: Ref<HTMLFormElement | null> = ref(null);
const userAmount: Ref<number | null> = ref(null);
const userDate: Ref<string | null> = ref(null);
const formError = ref("");
const formInvalid = ref(false);

/**
 * - toggles errors in the home page form.
 * @param err - string error to be displayed
 */
function toggleFormError(err: string) {
  formError.value = err;
  formInvalid.value = true;
  setTimeout(() => {
    formInvalid.value = false;
  }, 10000);
}

function showResults() {
  useCounterStore().amount = 0;
  useCounterStore().percentageGainLoss = 0;
  useCounterStore().profitLoss = 0;
  useCounterStore().stock = "";
  useCounterStore().dateSelected = "";
  useCounterStore().totalGainLoss = 0;
  useCounterStore().lossBoolean = false;
  useCounterStore().moreStocksMultiply = 0;
  if (userAmount.value && userDate.value) {
    axios({
      method: "post",
      url: "superYatchs/stocks",
      data: new FormData(form.value as HTMLFormElement),
    })
      .then((res) => {
        switch (res.data) {
          case "Weekend":
            toggleFormError("You've chosedn a Weekend");
            break;
          case "None":
            toggleFormError("Change the Date or Chose a different stock.");
            break;
          case "Connection Error":
            toggleFormError("Please make sure you have a stable network");
            break;
          case "Key Error":
            toggleFormError("Please fill all details before submiting");
            break;

          default:
            useCounterStore().amount = res.data["amount"];
            useCounterStore().percentageGainLoss =
              res.data["percentageGainLoss"];
            useCounterStore().profitLoss = res.data["profitLoss"];
            useCounterStore().stock = res.data["stock"];
            useCounterStore().dateSelected = res.data["dateSelected"];
            useCounterStore().totalGainLoss = res.data["totalGainLoss"];
            useCounterStore().lossBoolean = res.data["lossBoolean"];
            navigator.push("/results");
            break;
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
}

/**The length of data-item string to be displayed. Helps avoid overlapping the width of the device when displaying the stocks on the html select element */
const optionsTextTrimLength = ref(20);
if (window.outerWidth >= 700) {
  optionsTextTrimLength.value = 40;
}
if (window.outerWidth >= 1280) {
  optionsTextTrimLength.value = 50;
}

/**The number of sub-groups of the data-list */
let numberOfSharedStocks = 0;
/**The total number of items in each sub-group of the data-list */
let num = 0;

axios({
  method: "get",
  url: "superYatchs/stocksList",
})
  .then(async (res) => {
    if (res.data === "Connection Error") {
      toggleFormError("Please make sure you have a stable network connection");
    } else {
      fetchedStocks.value = res.data.stocks;
      numberOfStocks.value = fetchedStocks.value.length;
      fetchedStocks.value.sort((a: string[], b: string[]) => {
        if (a[1] > b[1]) {
          return 1;
        } else {
          return -1;
        }
      });
      numberOfSharedStocks = Math.round(numberOfStocks.value / 500);
      num = numberOfStocks.value / numberOfSharedStocks;
      stockList.value = fetchedStocks.value.slice(0, num);
    }
  })
  .catch((err) => {
    console.log(err.message);
  });

// onMounted(() => {
//   fetchedStocks.value = STOCKS;
//   fetchedStocks.value.sort((a: string[], b: string[]) => {
//     if (a[1] > b[1]) {
//       return 1;
//     } else {
//       return -1;
//     }
//   });
//   numberOfSharedStocks = Math.round(STOCKLength / 500);
//   num = STOCKLength / numberOfSharedStocks;
//   stockList.value = fetchedStocks.value.slice(0, num);
// });
/**You've reached the last stock option element */
let reachedFinalStock = ref(false);
/**You are at the first stock option element */
let atFirstStock = ref(true);
/**displays a new set of around 500 stocks moving forward in the data-list */
function moreStocks() {
  moveStocks(
    reachedFinalStock,
    atFirstStock,
    true,
    numberOfSharedStocks - 1,
    numberOfStocks.value
  );
}
/**displays a new set of around 500 stocks moving backwards in the data-list */
function lessStocks() {
  moveStocks(atFirstStock, reachedFinalStock, false, 0);
}
/**displays a new set of around 500 stocks moving either backwards or forwards in the data-list
 * @param {Ref<boolean>} atFinalFirstStock - boolean data-type to describe whether you are at the first or las stock
 * @param {Ref<boolean>} counterFinalFirstStock - boolean data-type to be assigned a value which describes we are no longer either at the first stock or the last stock
 * @param {boolean} add - boolean data-type to describe whether you should add or subtract to either move forward or backward.
 * @param {number} detectAtFinalFirstStock - number data-type that provides the index of either second-last value or the first value to help compute the end index value when slicing
 * @param {number} finalIndex - index of the end-value when slicing. Depends on whether you are moving forward or backwards in the list.
 */
function moveStocks(
  atFinalFirstStock: Ref<boolean>,
  counterFinalFirstStock: Ref<boolean>,
  add: boolean,
  detectAtFinalFirstStock: number,
  finalIndex?: number
) {
  if (!atFinalFirstStock.value) {
    counterFinalFirstStock.value = false;
    if (add) {
      ++useCounterStore().moreStocksMultiply;
      removeOpacity("lessStocks");
    } else {
      --useCounterStore().moreStocksMultiply;
      removeOpacity("moreStocks");
    }
    const moreToMultiply = useCounterStore().moreStocksMultiply * num;
    let final = num + moreToMultiply;
    if (useCounterStore().moreStocksMultiply === detectAtFinalFirstStock) {
      if (finalIndex) {
        final = finalIndex;
        addOpacity("moreStocks");
      } else {
        addOpacity("lessStocks");
      }
      atFinalFirstStock.value = true;
    }
    stockList.value = fetchedStocks.value.slice(moreToMultiply, final);
  }
}
/**
 * adds opacity of the specified element
 * @param idToAdd - id of the button element you want to add opacity
 */
function addOpacity(idToAdd: string) {
  const buttonElement = document.getElementById(idToAdd);
  buttonElement?.classList.add("opacity-50");
}
/**
 * removes opacity of the specified element
 * @param idToRemove -id of the button element you want to remove opacity
 */
function removeOpacity(idToRemove: string) {
  const buttonElement = document.getElementById(idToRemove);
  buttonElement?.classList.remove("opacity-50");
}

const amounttoinvestInput = ref(false);
const stocklistInput = ref(false);
const dateofstockInput = ref(false);
const boolsArray = [amounttoinvestInput, stocklistInput, dateofstockInput];
</script>

<template>
  <main class="flex flex-col mt-1 p-4">
    <section class="flex flex-col md:flex-row flex-1">
      <section
        class="flex-1 flex place-items-center border-r-2 rounded-full px-5"
      >
        <h2
          class="bg-gradient-to-tr from-slate-600 to-green-900 p-1 md:p-10 md:text-xl rounded-3xl opacity-75"
        >
          Stock calculator that helps you compute what a hypothetical investment
          would be worth today
        </h2>
      </section>
      <section class="flex flex-row place-items-center flex-1 ml-4">
        <form
          class="flex-col space-y-4 flex flex-1"
          @submit.prevent=""
          ref="form"
          id="form"
        >
          <div class="flex flex-col">
            <label for="amount" class="w-fit">
              <font-awesome-icon icon="fa-solid fa-dollar-sign" class="h-5" />
            </label>
            <div>
              <transition name="toast-input-info">
                <span
                  v-if="amounttoinvestInput"
                  class="text-xs absolute ml-2 bg-white rounded-md -mt-1 text-slate-500 font-sans px-1"
                  >*Amount To Invest</span
                >
              </transition>
              <input
                class="text-black p-1 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-green-500 focus:ring-green-500 focus:shadow-md focus:shadow-green-600 rounded-md focus:ring-1 w-full py-3"
                id="amount"
                name="amount"
                type="number"
                required
                placeholder="Amount To Invest"
                v-model="userAmount"
                @focus="show_input_info($event, 0, '', boolsArray)"
                @focusout="
                  show_input_info($event, 0, 'Amount To Invest', boolsArray)
                "
              />
            </div>
          </div>
          <div class="flex flex-col">
            <label for="stock" class="w-fit overflow-x-visible">in </label>
            <div class="flex flex-row space-x-3 pb-2">
              <button
                @click="moreStocks"
                id="moreStocks"
                class="bg-gradient-to-tr from-slate-600 to-green-900 text-xs rounded-md bg-green-900 p-1"
              >
                MORE STOCKS
              </button>
              <button
                @click="lessStocks"
                id="lessStocks"
                class="bg-gradient-to-tr from-slate-600 to-green-900 text-xs rounded-md bg-green-900 p-1 opacity-50"
              >
                LESS STOCKS
              </button>
            </div>
            <div>
              <transition name="toast-input-info">
                <span
                  v-if="stocklistInput"
                  class="text-xs absolute ml-2 bg-white rounded-md -mt-1 text-slate-500 font-sans px-1"
                  >*Pile of Stocks</span
                >
              </transition>
              <select
                class="text-black p-1 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-green-500 focus:ring-green-500 focus:shadow-md focus:shadow-green-600 rounded-md focus:ring-1 w-full py-3 text-xs"
                id="stock"
                name="stock"
                @focus="show_input_info($event, 1, '', boolsArray)"
                @focusout="show_input_info($event, 1, '', boolsArray)"
              >
                <option
                  v-for="stock in stockList"
                  :key="stock[0]"
                  :value="stock[0]"
                >
                  <span v-if="stock[1] == ''">{{ stock[0] }}</span>
                  <span v-else
                    >{{ stock[1].substring(0, optionsTextTrimLength) }} -
                    {{ stock[0] }}</span
                  >
                </option>
              </select>
            </div>
          </div>
          <div class="flex flex-col">
            <label for="dateOfStock" class="w-fit">On</label>
            <div>
              <transition name="toast-input-info">
                <span
                  v-if="dateofstockInput"
                  class="text-xs absolute ml-2 bg-white rounded-md -mt-1 text-slate-500 font-sans px-1"
                  >*Date of Investment</span
                >
              </transition>
              <input
                class="text-black p-1 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-green-500 focus:ring-green-500 focus:shadow-md focus:shadow-green-600 rounded-md focus:ring-1 w-full py-3"
                type="date"
                id="dateOfStock"
                name="dateSelected"
                required
                v-model="userDate"
                @focus="show_input_info($event, 2, '', boolsArray)"
                @focusout="show_input_info($event, 2, '', boolsArray)"
              />
            </div>
          </div>
          <button
            class="bg-gradient-to-tr from-slate-600 to-green-900 rounded-lg py-2 hover:-rotate-2 transition-all duration-1000"
            @click="showResults"
          >
            <font-awesome-icon
              icon="fa-solid fa-dollar-sign"
              class="h-4"
            />ubmit
          </button>
          <ToastFormError :form-error="formError" :form-invalid="formInvalid" />
        </form>
      </section>
    </section>
  </main>
</template>
