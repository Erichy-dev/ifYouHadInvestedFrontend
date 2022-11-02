<script setup lang="ts">
import { ref, computed } from "vue";
import type { Ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { useCounterStore } from "@/stores/counter";
// import STOCKS from "@/stocks";

document.title = "If I Had Invested - Eric Nyaga";

const date = ref(new Date().toISOString().substring(0, 10));

const loadStocks = ref(false);
const numberOfStocks = ref(0);
const fetchedStocks: Ref<string[][]> = ref([]);
const stockList: Ref<string[][]> = ref([]);
const numberOfStocksDisplayed = computed(() => stockList.value.length);
// fetchedStocks.value = STOCKS;
axios({
  method: "get",
  url: "stocksList",
}).then(async (res) => {
  fetchedStocks.value = res.data.stocks;
  numberOfStocks.value = fetchedStocks.value.length;
  fetchedStocks.value.sort((a: string[], b: string[]) => {
    if (a[1] > b[1]) {
      return 1;
    } else {
      return -1;
    }
  });
  const numberOfSharedStocks = Math.round(numberOfStocks.value / 500);
  const num = numberOfStocks.value / numberOfSharedStocks;
  stockList.value = fetchedStocks.value.slice(0, num);
  // loadStocks.value = true;
  // for (let i = 2; i <= numberOfSharedStocks + 1; i++) {
  //   let num1 = num * (i - 1);
  //   let num2 = num * i;
  //   if (i === numberOfSharedStocks + 1) {
  //     num1 = i * num;
  //     num2 = numberOfStocks.value;
  //     setTimeout(() => {
  //       loadStocks.value = false;
  //     }, 200);
  //   }
  //   setTimeout(() => {
  //     const newStocks = fetchedStocks.value.slice(num1, num2);
  //     stockList.value.push(...newStocks);
  //   }, 100);
  // }
});

const navigator = useRouter();
const form: Ref<HTMLFormElement | null> = ref(null);
function showResults() {
  useCounterStore().amount = 0;
  useCounterStore().percentageGainLoss = 0;
  useCounterStore().profitLoss = 0;
  useCounterStore().stock = "";
  useCounterStore().totalGainLoss = 0;
  useCounterStore().lossBoolean = false;
  axios({
    method: "post",
    url: "stocks",
    data: new FormData(form.value as HTMLFormElement),
  }).then((res) => {
    useCounterStore().amount = res.data["amount"];
    useCounterStore().percentageGainLoss = res.data["percentageGainLoss"];
    useCounterStore().profitLoss = res.data["profitLoss"];
    useCounterStore().stock = res.data["stock"];
    useCounterStore().totalGainLoss = res.data["totalGainLoss"];
    useCounterStore().lossBoolean = res.data["lossBoolean"];
  });
  navigator.push("/results");
}
</script>

<template>
  <main class="self-center md:w-6/12 w-10/12">
    <section class="flex flex-col place-items-center">
      <h1 class="text-xl md:text-4xl lg:text-5xl my-5">IF I HAD INVESTED</h1>
      <form
        class="w-full md:w-8/12 flex-col space-y-1 flex"
        @submit.prevent="showResults"
        ref="form"
        id="form"
      >
        <label for="amount">
          <font-awesome-icon icon="fa-solid fa-dollar-sign" class="h-5" />
        </label>
        <input
          class="border rounded-md p-1 border-black text-black"
          id="amount"
          name="amount"
          type="number"
          required
          placeholder="Amount"
        />
        <label for="stock" class="overflow-x-visible"
          >in ({{ numberOfStocksDisplayed }} / {{ numberOfStocks }} stocks)
          <font-awesome-icon
            icon="fa-solid fa-arrow-rotate-forward"
            class="h-5 animate-spin text-green-400 ml-1"
            v-if="loadStocks"
        /></label>
        <select
          class="border rounded-md p-1 border-black text-black w-auto"
          id="stock"
          name="stock"
        >
          <option v-for="stock in stockList" :key="stock[0]" :value="stock[0]">
            <span v-if="stock[1] == ''">{{ stock[0] }}</span>
            <span v-else>{{ stock[1] }} - {{ stock[0] }}</span>
          </option>
        </select>
        <label for="dateOfStock">On</label>
        <input
          class="border rounded-lg p-1 border-black text-black"
          type="date"
          id="dateOfStock"
          disabled
          :value="date"
        />
        <button class="bg-green-900 rounded-lg py-2 border-black" type="submit">
          <font-awesome-icon icon="fa-solid fa-dollar-sign" class="h-4" />ubmit
        </button>
      </form>
    </section>
    <div>
      <p class="text-lg">
        Want to know how many super-yatchs you'd have bought if you had just
        HODL stocks?<br />
        YES!... super
        <font-awesome-icon
          icon="fa-solid fa-ship"
          class="text-cyan-900 h-7"
        />YATCHS!
      </p>
      <button class="w-fit p-1 hover:underline mt-5">Share link</button>
    </div>
  </main>
</template>
