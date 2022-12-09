<script lang="ts" setup>
import { ref, watch, onMounted } from "vue";
import type { Ref } from "vue";
import { useCounterStore } from "../stores/counter";
import axios from "axios";
import { useRouter } from "vue-router";

import { dynamicInputError } from "./SignUp.vue";
import { show_input_info } from "./SignIn.vue";

document.title = "Investor Details";

/**Time to sue when determining whether its morning, afternoon or evening */
const currentTime: number = new Date().getHours();
const greetings = ref("");
if (currentTime <= 12) {
  greetings.value = "Good Morning";
} else if (currentTime <= 18) {
  greetings.value = "Good Afternoon";
} else {
  greetings.value = "Good Evening";
}

type investorSchema = {
  userName: string;
  firstName: string;
  lastName: string;
  phoneNumber: number;
  email: string;
  referralLink: string;
  referrals: number;
  earned: number;
  withdraw: boolean;
};

const investorDetails: Ref<investorSchema | null> = ref(null);
const earnedAmount = ref(0);
const earned = ref(0);
const depositPrompt = ref(false);
const withdrawPrompt = ref(false);
const processWithdraw = ref(false);
const initiatewithdraw = ref(false);
const initiateWithdrawRef: Ref<HTMLElement | null> = ref(null);
const calculateWithdrawal = ref(false);
const withdrawalAmount = ref(50);
const withdrawalResponse = ref("");

const form = new FormData();
form.append("userName", useCounterStore().userName);
onMounted(() => {
  axios({
    method: "post",
    url: "associates/associateDetails",
    data: form,
  })
    .then((res) => {
      if (res.data !== "None") {
        investorDetails.value = res.data;
        earnedAmount.value = (investorDetails.value as investorSchema).earned;
        earned.value = (investorDetails.value as investorSchema).earned;
        watch(withdrawalAmount, () => {
          earned.value = earnedAmount.value - withdrawalAmount.value;
        });
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
});

/**
 * - make sure there is no pending withdraw request before initiating the withdraw procedure
 * - iniates the withdrawal procedure
 */
function initiatewithdrawFunc() {
  if (useCounterStore().signedIn) {
    if (earned.value === 0) {
      depositPrompt.value = true;
    } else if (investorDetails.value?.withdraw === false) {
      initiatewithdraw.value = true;
      calculateWithdrawal.value = true;
      earned.value -= 50;
    } else {
      withdrawalResponse.value =
        "We're processing your previous withdraw request. Please be patient for 24 hours";
      processWithdraw.value = true;
    }
  } else {
    navigate.push("IIIAffiliate/");
  }
}

/**
 * - make sure the withdrawal amount is >= 50 && <= earned.value
 * - open a prompt asking the user whether he's certain.
 * - disable the withdraw button
 */
function processWithdrawFunc() {
  if (
    withdrawalAmount.value >= 50 &&
    withdrawalAmount.value <= earnedAmount.value
  ) {
    withdrawPrompt.value = true;
    (initiateWithdrawRef.value as HTMLButtonElement).disabled = true;
  }
}

/**
 * - returns the user to first stage of the withdrawal procedure
 * - show the "processWithdraw" prompt
 * - process the user withdrawal request by sending data to the database
 */
function acceptWithdrawal() {
  const form = new FormData();
  form.append("userName", useCounterStore().userName);
  form.append("withdrawalAmount", String(withdrawalAmount.value));
  axios({
    method: "post",
    url: "associates/withdraw",
    data: form,
  })
    .then((res) => {
      if (res.data === "Done" || res.data === "Don't") {
        withdrawPrompt.value = false;
        calculateWithdrawal.value = false;
        initiatewithdraw.value = false;
        (initiateWithdrawRef.value as HTMLButtonElement).disabled = true;
        processWithdraw.value = true;
        withdrawalResponse.value =
          "Your withdrawal will be processed within 24 hours.";
        setTimeout(() => {
          navigate.push("/IIIAffiliate");
        }, 3000);
      }
    })
    .catch();
}

/**
 * returns the user to first stage of the withdrawal procedure
 */
function rejectwithdrawal() {
  withdrawPrompt.value = false;
  calculateWithdrawal.value = false;
  initiatewithdraw.value = false;
  (initiateWithdrawRef.value as HTMLButtonElement).disabled = true;
}

const navigate = useRouter();
const deleteForm: Ref<HTMLFormElement | null> = ref(null);
const deletePrompt = ref(false);
const invalid = ref(false);
const invalidInput = ref("");
const deleteFullNames = ref("");
const deleteAccountRef: Ref<HTMLButtonElement | null> = ref(null);
const password = ref("");

const deleteFullNamesRef: Ref<HTMLInputElement | null> = ref(null);
watch([deleteFullNames, password], () => {
  dynamicInputError(
    deleteFullNames,
    ref(
      investorDetails.value?.firstName + " " + investorDetails.value?.lastName
    ),
    deleteFullNamesRef as Ref<HTMLInputElement>
  );
  if (
    deleteFullNames.value ===
      investorDetails.value?.firstName +
        " " +
        investorDetails.value?.lastName &&
    password.value !== ""
  ) {
    (deleteAccountRef.value as HTMLButtonElement).disabled = false;
  }
});

/**
 * @param bool1 - toggles the deletePrompt
 * @param bool2 - toggles the disabled attribute of the delete-account-button.
 */
function deletePromptFunc(bool1: boolean, bool2: boolean) {
  deletePrompt.value = bool1;
  (deleteAccountRef.value as HTMLButtonElement).disabled = bool2;
}

/**
 * open a prompt asking the user to confirm the delete request by retyping his full name and password.
 * deletes the user's account.
 */
function deleteAccount() {
  if (deletePrompt.value) {
    const deleteFormData = new FormData(deleteForm.value as HTMLFormElement);
    deleteFormData.append(
      "email",
      (investorDetails.value as investorSchema).email
    );
    axios({
      method: "post",
      url: "associates/deleteAccount",
      data: deleteFormData,
    })
      .then((res) => {
        if (res.data === "deleted") {
          navigate.push("/IIIAffiliate");
          useCounterStore().signedIn = false;
          useCounterStore().userName = "";
        } else {
          invalidInput.value = "Password is incorrect";
          invalid.value = true;
          setTimeout(() => {
            invalid.value = false;
          }, 5000);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  } else {
    deletePromptFunc(true, true);
  }
}

/**
 * - shows a load message when user hovers over the element. Uses the mouse position to determine where to place the toaster element.
 */
function loadMessage() {
  // console.log(event.m)
}

const amounttowithdrawInput = ref(false);
const reasonfordeleteInput = ref(false);
const reviewcriticInput = ref(false);
const fullnamesInput = ref(false);
const passwordInput = ref(false);
const firstnameInput = ref(false);
const lastnameInput = ref(false);
const emailInput = ref(false);
const boolsArray = [
  amounttowithdrawInput,
  reasonfordeleteInput,
  reviewcriticInput,
  fullnamesInput,
  passwordInput,
  firstnameInput,
  lastnameInput,
  emailInput,
];

const update_prompt = ref(false);
const email = ref(investorDetails.value?.firstName);
function close_update_prompt() {
  update_prompt.value = false;
}
const update_form: Ref<HTMLFormElement | null> = ref(null);
function updateAccount() {
  update_prompt.value = true;
  if (update_prompt.value) {
    const fmData = new FormData(update_form.value as HTMLFormElement);
    axios({
      method: "post",
      url: "associates/updateAccount",
      data: fmData,
    })
      .then((res) => {
        if (res.data === "Updated") {
          (investorDetails.value as investorSchema).firstName = fmData.get(
            "first_name"
          ) as string;
          (investorDetails.value as investorSchema).lastName = fmData.get(
            "last_name"
          ) as string;
          (investorDetails.value as investorSchema).email = fmData.get(
            "email"
          ) as string;
          update_prompt.value = false;
        }
      })
      .catch((err) => console.log(err.message));
  }
}
</script>

<template>
  <main class="flex flex-col self-center md:w-7/12 lg:w-5/12">
    <h1 class="text-xl md:text-4xl self-center flex-1 flex place-items-center">
      <span class="text-sky-600">{{ greetings }}</span>
      <span class="text-green-600">&nbsp;{{ investorDetails?.userName }}</span>
    </h1>
    <form
      @submit.prevent=""
      class="flex flex-col p-2 space-y-3 text-sm md:text-xl flex-1 text-green-600"
    >
      <div class="flex flex-row justify-between border-b-2 border-sky-600">
        <h3>USERNAME</h3>
        <h3>{{ investorDetails?.userName }}</h3>
      </div>
      <div class="flex flex-row justify-between border-b-2 border-sky-600">
        <h3>FULL NAMES</h3>
        <h3>
          {{ investorDetails?.firstName }} {{ investorDetails?.lastName }}
        </h3>
      </div>
      <div class="flex flex-row justify-between border-b-2 border-sky-600">
        <h3>PHONE NUMBER</h3>
        <h3>{{ investorDetails?.phoneNumber }}</h3>
      </div>
      <div class="flex flex-row justify-between border-b-2 border-sky-600">
        <h3>EMAIL</h3>
        <h3>{{ investorDetails?.email }}</h3>
      </div>
      <div class="flex flex-row justify-between border-b-2 border-sky-600">
        <h3>REFERRAL LINK</h3>
        <input
          type="text"
          disabled
          :value="investorDetails?.referralLink"
          class="bg-black w-4/12"
        />
      </div>
      <div class="flex flex-row justify-between border-b-2 border-sky-600">
        <h3>REFERRALS</h3>
        <h3>{{ investorDetails?.referrals }}</h3>
      </div>
      <div class="flex flex-row justify-between border-b-2 border-sky-600">
        <h3>EARNED</h3>
        <h3>Ksh. {{ earned }}</h3>
      </div>
      <transition-group name="toastWithdraw" appear mode="in-out">
        <div
          class="flex flex-row justify-between border-b-2 border-sky-600"
          key="calculateWithdrawl"
          v-if="calculateWithdrawal"
        >
          <label class="w-fit" for="withdraw">WITHDRAW</label>
          <div class="w-4/12">
            <transition name="toast-input-info">
              <span
                v-if="amounttowithdrawInput"
                class="text-xs absolute ml-2 bg-slate-500 rounded-md -mt-1 text-white font-sans px-1"
                >*Withdraw</span
              >
            </transition>
            <input
              type="number"
              min="50"
              placeholder="50"
              v-model="withdrawalAmount"
              :max="earnedAmount"
              id="withdraw"
              name="withdraw"
              class="text-white p-1 py-2 bg-slate-500 border shadow-sm border-sky-600 placeholder-slate-400 focus:outline-none focus:border-green-500 focus:ring-green-500 focus:shadow-md focus:shadow-green-600 rounded-md focus:ring-1 w-full"
              @focus="show_input_info($event, 0, '', boolsArray)"
              @focusout="show_input_info($event, 0, '50', boolsArray)"
            />
          </div>
        </div>
        <p
          class="flex flex-row text-red-700 border-b-2 border-sky-600"
          v-if="depositPrompt"
          key="withdrawPrompt"
        >
          Please &nbsp;<router-link
            to="/affiliateTerms"
            class="underline text-green-600"
            >Deposit</router-link
          >
          &nbsp; to start Earning.
        </p>
        <div
          class="w-7/12 self-center border-b-2 border-sky-600"
          v-if="withdrawPrompt"
          key="withdrawPrompt"
        >
          <p>Are you sure you would love to withdraw?</p>
          <div class="flex flex-row justify-between m-2">
            <button
              class="bg-gradient-to-tr from-slate-600 to-green-900 font-black rounded-lg p-1 hover:translate-y-1 hover:shadow-md duration-1000 hover:drop-shadow-xl hover:shadow-slate-700 transition-all transform-cpu text-white font-serif"
              @click="acceptWithdrawal"
            >
              YES
            </button>
            <button
              class="bg-gradient-to-tr from-slate-600 to-green-900 font-black rounded-lg p-1 hover:translate-y-1 hover:shadow-md duration-1000 hover:drop-shadow-xl hover:shadow-slate-700 transition-all transform-cpu text-white font-serif"
              @click="rejectwithdrawal"
            >
              NO
            </button>
          </div>
        </div>
        <p
          class="flex flex-row text-red-700 border-b-2 border-sky-600"
          v-if="processWithdraw"
          key="processWithdraw"
        >
          {{ withdrawalResponse }}
        </p>
        <button
          class="self-center bg-gradient-to-tr from-slate-600 to-green-900 font-black rounded-lg p-2 hover:translate-y-1 hover:shadow-md duration-1000 hover:drop-shadow-xl hover:shadow-slate-700 transition-all transform-cpu text-white font-serif w-9/12 md:w-7/12"
          v-if="!initiatewithdraw"
          key="withdrawDisagree"
          @click="initiatewithdrawFunc"
        >
          WITHDRAWALS
        </button>
        <router-link
          class="self-center bg-gradient-to-tr from-green-600 to-sky-900 font-black rounded-lg p-2 hover:translate-y-1 hover:shadow-md duration-1000 hover:drop-shadow-xl hover:shadow-slate-700 transition-all transform-cpu text-white font-serif w-9/12 md:w-7/12 disabled:opacity-30 place-content-center flex"
          v-if="useCounterStore().signedIn"
          to="referrals"
          key="referrals"
        >
          MY REFERRALS
        </router-link>
        <router-link
          class="self-center bg-gradient-to-tr from-green-600 to-sky-900 font-black rounded-lg p-2 hover:translate-y-1 hover:shadow-md duration-1000 hover:drop-shadow-xl hover:shadow-slate-700 transition-all transform-cpu text-white font-serif w-9/12 md:w-7/12 disabled:opacity-30 place-content-center flex"
          v-if="useCounterStore().signedIn"
          to="investorPreviousActivities"
          key="investorPreviousActivities"
        >
          RECENT ACTIVITIES
        </router-link>
        <router-link
          to="/topEarners"
          key="topEarners"
          class="self-center place-content-center flex bg-gradient-to-tr from-sky-600 to-green-900 font-black rounded-lg p-2 hover:translate-y-1 hover:shadow-md duration-1000 hover:drop-shadow-xl hover:shadow-slate-700 transition-all transform-cpu text-white font-serif w-9/12 md:w-7/12"
          >Top Earners</router-link
        >
        <font-awesome-icon
          key="loader"
          icon="fa-solid fa-arrow-rotate-forward"
          class="animate-spin w-fit self-center"
          v-if="investorDetails?.withdraw"
          @pointerover="loadMessage"
        />
        <button
          class="self-center bg-gradient-to-tr from-slate-600 to-green-900 font-black rounded-lg p-2 hover:translate-y-1 hover:shadow-md duration-1000 hover:drop-shadow-xl hover:shadow-slate-700 transition-all transform-cpu text-white font-serif w-9/12 md:w-7/12 disabled:opacity-30 place-content-center flex"
          v-if="initiatewithdraw"
          key="initiatewithdraw"
          @click="processWithdrawFunc"
          ref="initiateWithdrawRef"
        >
          WITHDRAW
        </button>
        <section
          class="flex flex-row border-t-2 border-red-600 pt-4"
          v-if="deletePrompt"
          key="deletePrompt"
        >
          <form
            id="deleteUserForm"
            ref="deleteForm"
            @submit.prevent=""
            class="self-center border-b-2 pb-4 border-red-600 space-y-8"
          >
            <p class="flex flex-col leading-loose">
              <span class="text-orange-600"
                >Are you sure you want to delete your account? </span
              ><span class="animate-pulse text-orange-200"
                >TERRIBLE things could happen if you procede.</span
              ><span class="text-red-600">Please fill the form below:</span>
            </p>
            <div class="flex flex-col space-y-2">
              <label class="w-fit" for="reasonForDelete"
                >Why Do You Want To Leave?</label
              >
              <div>
                <transition name="toast-input-info">
                  <span
                    class="text-xs absolute ml-2 bg-black bg-opacity-80 rounded-md -mt-1 text-slate-300 font-sans px-1"
                    v-if="reasonfordeleteInput"
                    >*Reason for leaving</span
                  >
                </transition>
                <textarea
                  id="reasonForDelete"
                  name="reason_for_delete"
                  rows="5"
                  required
                  placeholder="e.g. I've achieved my financial target"
                  class="text-white p-1 py-3 bg-slate-500 border shadow-sm border-sky-600 placeholder-slate-400 focus:outline-none focus:border-green-500 focus:ring-green-500 focus:shadow-md focus:shadow-green-600 rounded-md focus:ring-1 md:w-9/12 bg-opacity-20"
                  @focus="show_input_info($event, 1, '', boolsArray)"
                  @focusout="
                    show_input_info(
                      $event,
                      1,
                      'e.g. I\'ve achieved my financial target',
                      boolsArray
                    )
                  "
                ></textarea>
              </div>
              <label class="w-fit" for="reviewCritic"
                >What's Your Experience at IfIHadInvested</label
              >
              <div>
                <transition name="toast-input-info">
                  <span
                    v-if="reviewcriticInput"
                    class="text-xs absolute ml-2 bg-black bg-opacity-80 rounded-md -mt-1 text-slate-300 font-sans px-1"
                    >*Your review or critic</span
                  >
                </transition>
                <textarea
                  id="reviewCritic"
                  name="review_critic"
                  required
                  rows="5"
                  placeholder="e.g. I had a lovely experience but you've got to upgrade your ..."
                  class="text-white p-1 py-3 bg-slate-500 border shadow-sm border-sky-600 placeholder-slate-400 focus:outline-none focus:border-green-500 focus:ring-green-500 focus:shadow-md focus:shadow-green-600 rounded-md focus:ring-1 md:w-9/12 bg-opacity-20"
                  @focus="show_input_info($event, 2, '', boolsArray)"
                  @focusout="
                    show_input_info(
                      $event,
                      2,
                      'e.g. I had a lovely experience but you\'ve got to upgrade your ...',
                      boolsArray
                    )
                  "
                ></textarea>
              </div>
              <label class="w-fit" for="deleteFullNames">Full Names</label>
              <div>
                <transition name="toast-input-info">
                  <span
                    v-if="fullnamesInput"
                    class="text-xs absolute ml-2 bg-black bg-opacity-80 rounded-md -mt-1 text-slate-300 font-sans px-1"
                    >*Your full names</span
                  >
                </transition>
                <input
                  type="text"
                  id="deleteFullNames"
                  ref="deleteFullNamesRef"
                  required
                  placeholder="e.g. Eric Nyaga"
                  v-model="deleteFullNames"
                  class="text-white p-1 py-3 bg-slate-500 border shadow-sm border-sky-600 placeholder-slate-400 focus:outline-none focus:border-green-500 focus:ring-green-500 focus:shadow-md focus:shadow-green-600 rounded-md focus:ring-1 w-6/12 bg-opacity-20"
                  @focus="show_input_info($event, 3, '', boolsArray)"
                  @focusout="
                    show_input_info($event, 3, 'e.g. Eric Nyaga', boolsArray)
                  "
                />
              </div>
              <input
                type="text"
                :value="investorDetails?.userName"
                name="user_name"
                class="hidden"
              />
              <label class="w-fit" for="password">Password</label>
              <div>
                <transition name="toast-input-info">
                  <span
                    v-if="passwordInput"
                    class="text-xs absolute ml-2 bg-black bg-opacity-80 rounded-md -mt-1 text-slate-300 font-sans px-1"
                    >*password</span
                  >
                </transition>
                <input
                  type="password"
                  v-model="password"
                  placeholder="password"
                  id="password"
                  required
                  name="password"
                  class="text-white p-1 py-3 bg-slate-500 border shadow-sm border-sky-600 placeholder-slate-400 focus:outline-none focus:border-green-500 focus:ring-green-500 focus:shadow-md focus:shadow-green-600 rounded-md focus:ring-1 w-4/12 bg-opacity-20"
                  @focus="show_input_info($event, 4, '', boolsArray)"
                  @focusout="show_input_info($event, 4, 'password', boolsArray)"
                />
              </div>
            </div>
            <transition name="toast">
              <p v-if="invalid" class="text-red-600 self-center text-sm">
                {{ invalidInput }}
              </p>
            </transition>
          </form>
          <button class="self-start">
            <font-awesome-icon
              icon="fa-solid fa-window-close"
              @click="deletePromptFunc(false, false)"
              class="text-red-700 h-9"
            />
          </button>
        </section>
        <section
          class="flex flex-row border-t-2 pt-4 border-red-600 justify-between"
          v-if="update_prompt"
          key="update_prompt"
        >
          <form
            @submit.prevent=""
            ref="update_form"
            class="flex flex-col space-y-1 text-sm md:text-lg border-b-2 pb-4 border-red-600"
          >
            <h3
              class="self-center text-2xl text-orange-600 pb-2 underline underline-offset-4 decoration-red-600"
            >
              Type in your NEW Details
            </h3>
            <div class="flex flex-row justify-between">
              <label
                for="firstName"
                class="flex-1 text-sm md:text-lg pr-1 flex place-items-center"
                >FIRST NAME</label
              >
              <div>
                <transition name="toast-input-info">
                  <span
                    v-if="firstnameInput"
                    class="text-xs absolute ml-2 bg-white rounded-md -mt-1 text-slate-500 font-sans px-1"
                    >*registered first name</span
                  >
                </transition>
                <input
                  class="text-black p-1 py-3 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-green-500 focus:ring-green-500 focus:shadow-md focus:shadow-green-600 rounded-md focus:ring-1"
                  type="text"
                  required
                  :value="investorDetails?.firstName"
                  id="firstName"
                  name="first_name"
                  @focus="show_input_info($event, 5, '', boolsArray)"
                  @focusout="
                    show_input_info(
                      $event,
                      5,
                      'registered first name',
                      boolsArray
                    )
                  "
                />
              </div>
            </div>
            <div class="flex flex-row justify-between">
              <label
                for="lastName"
                class="flex-1 text-sm md:text-lg pr-1 flex place-items-center"
                >LAST NAME</label
              >
              <div>
                <transition name="toast-input-info">
                  <span
                    v-if="lastnameInput"
                    class="text-xs absolute ml-2 bg-white rounded-md -mt-1 text-slate-500 font-sans px-1"
                    >*registered last name</span
                  >
                </transition>
                <input
                  class="text-black p-1 py-3 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-green-500 focus:ring-green-500 focus:shadow-md focus:shadow-green-600 rounded-md focus:ring-1"
                  type="text"
                  required
                  :value="investorDetails?.lastName"
                  id="lastName"
                  name="last_name"
                  @focus="show_input_info($event, 6, '', boolsArray)"
                  @focusout="
                    show_input_info(
                      $event,
                      6,
                      'registered last name',
                      boolsArray
                    )
                  "
                />
              </div>
            </div>
            <div class="flex flex-row justify-between">
              <label
                for="email"
                class="flex-1 text-sm md:text-lg pr-1 flex place-items-center"
                >EMAIL</label
              >
              <div>
                <transition name="toast-input-info">
                  <span
                    v-if="emailInput"
                    class="text-xs absolute ml-2 bg-white rounded-md -mt-1 text-slate-500 font-sans px-1"
                    >*registered GMAIL</span
                  >
                </transition>
                <input
                  class="text-black p-1 py-3 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-green-500 focus:ring-green-500 focus:shadow-md focus:shadow-green-600 rounded-md focus:ring-1"
                  type="email"
                  required
                  :value="investorDetails?.email"
                  id="email"
                  name="email"
                  @focus="show_input_info($event, 7, '', boolsArray)"
                  @focusout="
                    show_input_info($event, 7, 'registered GMAIL', boolsArray)
                  "
                />
              </div>
              <input
                type="text"
                name="userName"
                :value="investorDetails?.userName"
                class="hidden"
              />
            </div>
          </form>
          <button class="self-start">
            <font-awesome-icon
              icon="fa-solid fa-window-close"
              @click="close_update_prompt"
              class="text-red-700 h-9"
            />
          </button>
        </section>
      </transition-group>
    </form>
    <button
      v-if="useCounterStore().signedIn"
      ref="updateAccountRef"
      class="text-white self-center bg-gradient-to-tr from-sky-600 to-orange-600 font-black rounded-lg p-2 hover:translate-y-1 hover:shadow-md duration-1000 hover:drop-shadow-xl hover:shadow-slate-700 transition-all transform-cpu font-serif my-2 disabled:opacity-20"
      key="updateAccount"
      @click="updateAccount"
    >
      UPDATE ACCOUNT
    </button>
    <button
      v-if="useCounterStore().signedIn"
      ref="deleteAccountRef"
      class="text-orange-200 self-center bg-gradient-to-tr from-green-600 to-red-900 font-black rounded-lg p-2 hover:translate-y-1 hover:shadow-md duration-1000 hover:drop-shadow-xl hover:shadow-slate-700 transition-all transform-cpu font-serif my-2 disabled:opacity-20"
      key="deleteAccount"
      @click="deleteAccount"
    >
      DELETE ACCOUNT
    </button>
  </main>
</template>

<style>
.toastWithdraw-move,
.toastWithdraw-enter-active {
  transition: all 3s ease-in-out;
}
.toastWithdraw-leave-active {
  position: absolute;
}
.toastWithdraw-leave-active,
.toastWithdraw-enter-from {
  opacity: 0;
  transform: translateX(20px);
}
</style>
