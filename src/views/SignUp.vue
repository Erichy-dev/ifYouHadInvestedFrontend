<script lang="ts" setup>
import { watch, ref } from "vue";
import type { Ref } from "vue";
import GoogleRecaptcha from "../components/GoogleRecaptcha.vue";
import axios from "axios";
import { useCounterStore } from "../stores/counter";
import { useRouter } from "vue-router";

document.title = "IfIHadInvested Investor Sign Up";

const userName = ref("");
const email = ref("");
const password1 = ref("");
const password2 = ref("");
const invalid = ref(false);
const invalidInput = ref("");
const form: Ref<HTMLFormElement | null> = ref(null);
const navigator = useRouter();

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
    axios({
      method: "post",
      url: "associates/signUp",
      data: new FormData(form.value as HTMLFormElement),
    })
      .then((res) => {
        if (res.data === "valid") {
          useCounterStore().userName = userName.value;
          useCounterStore().signedIn = true;
          navigator.push("/associate");
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
        <input
          class="text-black p-1 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-green-500 focus:ring-green-500 focus:shadow-md focus:shadow-green-600 rounded-md focus:ring-1"
          type="text"
          v-model="userName"
          required
          placeholder="your user name"
          id="userName"
          name="userName"
        />
      </div>
      <div class="flex flex-row justify-between">
        <label for="firstName" class="flex-1 text-sm md:text-lg"
          >FIRST NAME <span class="text-red-800">*</span></label
        >
        <input
          class="text-black p-1 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-green-500 focus:ring-green-500 focus:shadow-md focus:shadow-green-600 rounded-md focus:ring-1"
          type="text"
          required
          placeholder="registered first name"
          id="firstName"
          name="firstName"
        />
      </div>
      <div class="flex flex-row justify-between">
        <label for="lastName" class="flex-1 text-sm md:text-lg"
          >LAST NAME <span class="text-red-800">*</span></label
        >
        <input
          class="text-black p-1 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-green-500 focus:ring-green-500 focus:shadow-md focus:shadow-green-600 rounded-md focus:ring-1"
          type="text"
          required
          placeholder="registered last name"
          id="lastName"
          name="lastName"
        />
      </div>
      <div class="flex flex-row justify-between">
        <label for="email" class="flex-1 text-sm md:text-lg"
          >EMAIL <span class="text-red-800">*</span></label
        >
        <input
          class="text-black p-1 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-green-500 focus:ring-green-500 focus:shadow-md focus:shadow-green-600 rounded-md focus:ring-1"
          type="email"
          required
          placeholder="registered GMAIL"
          v-model="email"
          id="email"
          name="email"
        />
      </div>
      <div class="flex flex-row justify-between">
        <label for="phoneNumber" class="flex-1 text-sm md:text-lg"
          >PHONE NUMBER <span class="text-red-800">*</span></label
        >
        <input
          class="text-black p-1 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-green-500 focus:ring-green-500 focus:shadow-md focus:shadow-green-600 rounded-md focus:ring-1"
          type="tel"
          required
          placeholder="registered phone number"
          id="phoneNumber"
          name="phoneNumber"
        />
      </div>
      <div class="flex flex-row justify-between">
        <label for="affiliateAmount" class="flex-1 text-sm md:text-lg"
          >AFFILIATE AMOUNT</label
        >
        <input
          class="text-black p-1 border-slate-300 rounded-md bg-slate-300"
          type="number"
          disabled
          value="50"
          placeholder="registered phone number"
          id="affiliateAmount"
        />
        <!-- <select
          name="referral_amount"
          id="referral_amount"
          required
          class="text-black p-1 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-green-500 focus:ring-green-500 focus:shadow-md focus:shadow-green-600 rounded-md focus:ring-1"
        >
          <option value="50" selected>50</option>
          <option value="100">100</option>
          <option value="200">200</option>
          <option value="500">500</option>
          <option value="1000">1000</option>
        </select> -->
      </div>
      <div class="flex flex-row justify-between">
        <label for="password1" class="flex-1 text-sm md:text-lg"
          >Password <span class="text-red-800">*</span></label
        >
        <input
          class="text-black p-1 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-green-500 focus:ring-green-500 focus:shadow-md focus:shadow-green-600 rounded-md focus:ring-1"
          type="password"
          v-model="password1"
          required
          placeholder="a strong password"
          id="password1"
          name="password1"
        />
      </div>
      <div class="flex flex-row justify-between">
        <label for="password2" class="flex-1 text-sm md:text-lg"
          >Password Confirmation <span class="text-red-800">*</span></label
        >
        <input
          class="text-black p-1 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-green-500 focus:ring-green-500 focus:shadow-md focus:shadow-green-600 rounded-md focus:ring-1"
          type="password"
          v-model="password2"
          ref="password2Ref"
          required
          placeholder="repeat password"
          id="password2"
          name="password2"
        />
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
