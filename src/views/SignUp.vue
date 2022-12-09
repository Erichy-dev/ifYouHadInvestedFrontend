<script lang="ts" setup>
import { watch, ref } from "vue";
import type { Ref } from "vue";
import GoogleRecaptcha from "../components/GoogleRecaptcha.vue";
import axios from "axios";
import { useCounterStore } from "../stores/counter";
import { useRoute, useRouter } from "vue-router";

import { show_input_info } from "./SignIn.vue";

document.title = "Investor Sign Up";

const userName = ref("");
const email = ref("");
const password1 = ref("");
const password2 = ref("");
const invalid = ref(false);
const invalidInput = ref("");
const form: Ref<HTMLFormElement | null> = ref(null);
const navigator = useRouter();
const navigate = useRoute();

const associate_link = navigate.query.a_link;

function createProfile() {
  if (password1.value !== password2.value) {
    invalidInput.value = "Your Passwords Do Not Match";
    invalid.value = true;
    setTimeout(() => {
      invalid.value = false;
    }, 5000);
  } else if (!email.value.includes("@gmail.com")) {
    invalidInput.value = "Your Gmail is Invalid";
    invalid.value = true;
    setTimeout(() => {
      invalid.value = false;
    }, 5000);
  } else {
    const fm_data = new FormData(form.value as HTMLFormElement);
    if (associate_link) fm_data.append("a_link", associate_link as string);
    axios({
      method: "post",
      url: "associates/signUp",
      data: fm_data,
    })
      .then((res) => {
        if (res.data === "valid") {
          useCounterStore().userName = userName.value;
          useCounterStore().signedIn = true;
          navigator.push("/IIIAffiliate");
        } else {
          invalidInput.value =
            "These fields already exist:::" + Object.keys(res.data).join(",");
          invalid.value = true;
          setTimeout(() => {
            invalid.value = false;
          }, 7000);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
}

const password2Ref: Ref<HTMLInputElement | null> = ref(null);
watch(password2, () => {
  dynamicInputError(
    password1,
    password2,
    password2Ref as Ref<HTMLInputElement>
  );
});

const usernameInput = ref(false);
const firstnameInput = ref(false);
const lastnameInput = ref(false);
const emailInput = ref(false);
const phonenumberInput = ref(false);
const affiliateamountInput = ref(false);
const passwordInput = ref(false);
const password2Input = ref(false);
const boolsArray = [
  usernameInput,
  firstnameInput,
  lastnameInput,
  emailInput,
  phonenumberInput,
  affiliateamountInput,
  passwordInput,
  password2Input,
];
</script>

<script lang="ts">
export function dynamicInputError(
  input1: Ref<string>,
  input2: Ref<string>,
  inputElement: Ref<HTMLInputElement>
) {
  if (input2.value !== input1.value) {
    inputElement.value.classList.remove(
      "focus:shadow-green-600",
      "focus:ring-green-500"
    );
    inputElement.value.classList.add(
      "focus:shadow-red-600",
      "focus:ring-red-500"
    );
  } else {
    inputElement.value.classList.add(
      "focus:shadow-green-600",
      "focus:ring-green-500"
    );
    inputElement.value.classList.remove(
      "focus:shadow-red-600",
      "focus:ring-red-500"
    );
  }
}
</script>

<template>
  <main class="flex flex-col place-items-center font-serif">
    <h1
      class="flex-1 flex flex-row place-items-center md:text-4xl text-xl text-sky-600"
    >
      WELCOME <span class="text-green-600">&nbsp; INVESTOR</span>
    </h1>
    <form
      ref="form"
      action=""
      @submit.prevent="createProfile"
      class="flex flex-col p-2 space-y-1 md:w-7/12 lg:w-5/12 text-sm md:text-lg"
    >
      <h2
        class="self-center md:text-3xl underline underline-offset-4 mb-2 decoration-green-900 decoration-1 text-lg"
      >
        CREATE ACCOUNT
      </h2>
      <strong class="text-red-700 self-center underline-offset-4 pb-5"
        >Kindly first read the
        <router-link to="/affiliateTerms" class="underline hover:text-white"
          >Terms and Conditions</router-link
        ></strong
      >
      <!-- <div class="w-6/12 self-center">
          <img
            src="/DLS.jpg"
            alt="profile pic"
            class="rounded-full border-white"
          />
        </div>
        <div class="flex flex-row justify-between">
          <label for="profile" class="mr-2">PROFILE</label>
          <input type="file" id="profile" />
        </div> -->
      <div class="flex flex-row justify-between">
        <label for="userName" class="flex-1 text-sm md:text-lg"
          >USER NAME <span class="text-red-800">*</span></label
        >
        <div>
          <transition name="toast-input-info">
            <span
              v-if="usernameInput"
              class="text-xs absolute ml-2 bg-white rounded-md -mt-1 text-slate-500 font-sans px-1"
              >*your user name</span
            >
          </transition>
          <input
            class="text-black p-1 py-3 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-green-500 focus:ring-green-500 focus:shadow-md focus:shadow-green-600 rounded-md focus:ring-1"
            type="text"
            v-model="userName"
            required
            placeholder="your user name"
            id="userName"
            name="userName"
            @focus="show_input_info($event, 0, '', boolsArray)"
            @focusout="show_input_info($event, 0, 'your user name', boolsArray)"
          />
        </div>
      </div>
      <div class="flex flex-row justify-between">
        <label for="firstName" class="flex-1 text-sm md:text-lg"
          >FIRST NAME <span class="text-red-800">*</span></label
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
            placeholder="registered first name"
            id="firstName"
            name="firstName"
            @focus="show_input_info($event, 1, '', boolsArray)"
            @focusout="
              show_input_info($event, 1, 'registered first name', boolsArray)
            "
          />
        </div>
      </div>
      <div class="flex flex-row justify-between">
        <label for="lastName" class="flex-1 text-sm md:text-lg"
          >LAST NAME <span class="text-red-800">*</span></label
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
            placeholder="registered last name"
            id="lastName"
            name="lastName"
            @focus="show_input_info($event, 2, '', boolsArray)"
            @focusout="
              show_input_info($event, 2, 'registered last name', boolsArray)
            "
          />
        </div>
      </div>
      <div class="flex flex-row justify-between">
        <label for="email" class="flex-1 text-sm md:text-lg"
          >EMAIL <span class="text-red-800">*</span></label
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
            placeholder="registered GMAIL"
            v-model="email"
            id="email"
            name="email"
            @focus="show_input_info($event, 3, '', boolsArray)"
            @focusout="
              show_input_info($event, 3, 'registered GMAIL', boolsArray)
            "
          />
        </div>
      </div>
      <div class="flex flex-row justify-between">
        <label for="phoneNumber" class="flex-1 text-sm md:text-lg"
          >PHONE NUMBER <span class="text-red-800">*</span></label
        >
        <div>
          <transition name="toast-input-info">
            <span
              v-if="phonenumberInput"
              class="text-xs absolute ml-2 bg-white rounded-md -mt-1 text-slate-500 font-sans px-1"
              >*registered phone number</span
            >
          </transition>
          <input
            class="text-black p-1 py-3 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-green-500 focus:ring-green-500 focus:shadow-md focus:shadow-green-600 rounded-md focus:ring-1"
            type="tel"
            required
            placeholder="registered phone number"
            id="phoneNumber"
            name="phoneNumber"
            @focus="show_input_info($event, 4, '', boolsArray)"
            @focusout="
              show_input_info($event, 4, 'registered phone number', boolsArray)
            "
          />
        </div>
      </div>
      <div class="flex flex-row justify-between">
        <label for="affiliateAmount" class="text-sm md:text-lg flex-1"
          >AFFILIATE AMOUNT <span class="text-red-800">*</span></label
        >
        <div class="flex-1">
          <transition name="toast-input-info">
            <span
              v-if="affiliateamountInput"
              class="text-xs absolute ml-2 bg-white rounded-md -mt-1 text-slate-500 font-sans px-1"
              >*affiliate amount</span
            >
          </transition>
          <select
            name="referral_amount"
            id="affiliateAmount"
            required
            class="text-black p-1 py-3 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-green-500 focus:ring-green-500 focus:shadow-md focus:shadow-green-600 rounded-md focus:ring-1 w-full"
            @focus="show_input_info($event, 5, '', boolsArray)"
            @focusout="show_input_info($event, 5, '', boolsArray)"
          >
            <option value="50" selected>50</option>
            <option value="100">100</option>
            <option value="200">200</option>
            <option value="500">500</option>
            <option value="1000">1, 000</option>
            <option value="5000">5, 000</option>
            <option value="10000">10, 000</option>
          </select>
        </div>
      </div>
      <div class="flex flex-row justify-between">
        <label for="password1" class="flex-1 text-sm md:text-lg"
          >PASSWORD <span class="text-red-800">*</span></label
        >
        <div>
          <transition name="toast-input-info">
            <span
              v-if="passwordInput"
              class="text-xs absolute ml-2 bg-white rounded-md -mt-1 text-slate-500 font-sans px-1"
              >*a strong password</span
            >
          </transition>
          <input
            class="text-black p-1 py-3 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-green-500 focus:ring-green-500 focus:shadow-md focus:shadow-green-600 rounded-md focus:ring-1"
            type="password"
            v-model="password1"
            required
            placeholder="a strong password"
            id="password1"
            name="password1"
            @focus="show_input_info($event, 6, '', boolsArray)"
            @focusout="
              show_input_info($event, 6, 'a strong password', boolsArray)
            "
          />
        </div>
      </div>
      <div class="flex flex-row justify-between">
        <label for="password2" class="flex-1 text-sm md:text-lg"
          >PASSWORD CONFIRMATION<span class="text-red-800">*</span></label
        >
        <div>
          <transition name="toast-input-info">
            <span
              v-if="password2Input"
              class="text-xs absolute ml-2 bg-white rounded-md -mt-1 text-slate-500 font-sans px-1"
              >*repeat password</span
            >
          </transition>
          <input
            class="text-black p-1 py-3 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-green-500 focus:ring-green-500 focus:shadow-md focus:shadow-green-600 rounded-md focus:ring-1"
            type="password"
            v-model="password2"
            ref="password2Ref"
            required
            placeholder="repeat password"
            id="password2"
            name="password2"
            @focus="show_input_info($event, 7, '', boolsArray)"
            @focusout="
              show_input_info($event, 7, 'repeat password', boolsArray)
            "
          />
        </div>
      </div>
      <transition name="toast">
        <p v-if="invalid" class="text-red-600 self-center text-sm">
          {{ invalidInput }}
        </p>
      </transition>
      <div class="self-center flex flex-col space-y-3">
        <button
          class="bg-sky-900 p-2 rounded-xl md:text-xl w-fit"
          type="submit"
        >
          Submit
        </button>
        <router-link to="/signIn">
          <button
            class="bg-sky-900 p-2 rounded-xl md:text-xl w-fit self-center"
          >
            SIGN IN
          </button>
        </router-link>
      </div>
      <google-recaptcha />
    </form>
  </main>
</template>
