<script lang="ts" setup>
import { ref, watch, watchEffect } from "vue";
import type { Ref } from "vue";
import { useCounterStore } from "../stores/counter";
import axios from "axios";
import { useRouter } from "vue-router";

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
axios({
  method: "post",
  url: "associates/associateDetails",
  data: form,
})
  .then((res) => {
    investorDetails.value = res.data;
    earnedAmount.value = (investorDetails.value as investorSchema).earned;
    earned.value = (investorDetails.value as investorSchema).earned;
    watch(withdrawalAmount, () => {
      earned.value = earnedAmount.value - withdrawalAmount.value;
    });
  })
  .catch();

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
watchEffect(() => {
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
          invalidInput.value = "Your Credentials are invalid";
          invalid.value = true;
          setTimeout(() => {
            invalid.value = false;
          }, 5000);
        }
      })
      .catch((err) => {
        //
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
          v-if="calculateWithdrawal"
          key="calculateWithdrawl"
        >
          <label for="withdraw">WITHDRAW</label>
          <input
            type="number"
            min="50"
            placeholder="50"
            v-model="withdrawalAmount"
            :max="earnedAmount"
            id="withdraw"
            name="withdraw"
            class="text-slate-200 p-1 bg-slate-500 border shadow-sm border-sky-600 placeholder-slate-400 focus:outline-none focus:border-green-500 focus:ring-green-500 focus:shadow-md focus:shadow-green-600 rounded-md focus:ring-1 w-4/12"
          />
        </div>
        <p
          class="flex flex-row text-red-700 border-b-2 border-sky-600"
          v-if="depositPrompt"
          key="withdrawPrompt"
        >
          Please &nbsp;<a
            href="/IIIAffiliate#affiliateTerms"
            class="underline text-green-600"
            >Deposit</a
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
          class="self-center bg-gradient-to-tr from-slate-600 to-green-900 font-black rounded-lg p-2 hover:translate-y-1 hover:shadow-md duration-1000 hover:drop-shadow-xl hover:shadow-slate-700 transition-all transform-cpu text-white font-serif"
          v-if="!initiatewithdraw"
          key="withdrawDisagree"
          @click="initiatewithdrawFunc"
        >
          WITHDRAWALS
        </button>
        <router-link
          to="/topEarners"
          key="topEarners"
          class="self-center bg-gradient-to-tr from-sky-600 to-green-900 font-black rounded-lg p-2 hover:translate-y-1 hover:shadow-md duration-1000 hover:drop-shadow-xl hover:shadow-slate-700 transition-all transform-cpu text-white font-serif"
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
          class="self-center bg-gradient-to-tr from-slate-600 to-green-900 font-black rounded-lg p-2 hover:translate-y-1 hover:shadow-md duration-1000 hover:drop-shadow-xl hover:shadow-slate-700 transition-all transform-cpu text-white font-serif disabled:opacity-30"
          v-if="initiatewithdraw"
          key="initiatewithdraw"
          @click="processWithdrawFunc"
          ref="initiateWithdrawRef"
        >
          WITHDRAW
        </button>
        <!-- <router-link
          class="self-center bg-gradient-to-tr from-slate-600 to-green-900 font-black rounded-lg p-2 hover:translate-y-1 hover:shadow-md duration-1000 hover:drop-shadow-xl hover:shadow-slate-700 transition-all transform-cpu text-white font-serif disabled:opacity-30"
          to="investorPreviousActivities"
          key="investorPreviousActivities"
        >
          <button>PREVIOUS ACTIVITIES</button>
        </router-link> -->
        <form
          ref="deleteForm"
          v-if="deletePrompt"
          @submit.prevent=""
          class="self-center border-b-2 border-sky-600"
          key="deletePrompt"
        >
          <p class="flex flex-col leading-loose">
            <span
              >Are you sure you want to delete your account?
              <font-awesome-icon
                icon="fa-solid fa-window-close"
                @click="deletePromptFunc(false, false)"
                class="text-red-700 ml-4" /></span
            ><span>Terrible things could happen if you procede.</span
            ><span>Please fill the in the form below to procede.</span>
          </p>
          <div class="flex flex-col space-y-2">
            <label for="deleteUserName">User Name</label>
            <input
              type="text"
              id="deleteUserName"
              required
              placeholder="Your Full Names"
              v-model="deleteFullNames"
              name="deleteUserName"
              class="text-slate-200 p-1 bg-slate-500 border shadow-sm border-sky-600 placeholder-slate-400 focus:outline-none focus:border-green-500 focus:ring-green-500 focus:shadow-md focus:shadow-green-600 rounded-md focus:ring-1 w-4/12 bg-opacity-20"
            />
            <input
              type="text"
              :value="investorDetails?.userName"
              name="deleteUserName"
              class="hidden"
            />
            <label for="password">Password</label>
            <input
              type="password"
              v-model="password"
              placeholder="password"
              id="password"
              required
              name="password"
              class="text-slate-200 p-1 bg-slate-500 border shadow-sm border-sky-600 placeholder-slate-400 focus:outline-none focus:border-green-500 focus:ring-green-500 focus:shadow-md focus:shadow-green-600 rounded-md focus:ring-1 w-4/12 bg-opacity-20"
            />
          </div>
          <transition name="toast">
            <p v-if="invalid" class="text-red-600 self-center text-sm">
              {{ invalidInput }}
            </p>
          </transition>
        </form>
      </transition-group>
    </form>
    <button
      v-if="useCounterStore().signedIn"
      ref="deleteAccountRef"
      class="text-orange-300 self-center bg-gradient-to-tr from-green-600 to-red-900 font-black rounded-lg p-2 hover:translate-y-1 hover:shadow-md duration-1000 hover:drop-shadow-xl hover:shadow-slate-700 transition-all transform-cpu text-white font-serif my-2 disabled:opacity-40"
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
