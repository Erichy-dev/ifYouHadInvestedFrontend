<script lang="ts" setup>
import GoogleRecaptcha from "../components/GoogleRecaptcha.vue";
import { ref } from "vue";
import type { Ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { useCounterStore } from "../stores/counter";

const form: Ref<HTMLFormElement | null> = ref(null);
const userName = ref("");
const password = ref("");
const invalid = ref(false);

const navigate = useRouter();

function signIn() {
  axios({
    method: "post",
    url: "associates/signIn",
    data: new FormData(form.value as HTMLFormElement),
  })
    .then((res) => {
      if (res.data !== "None") {
        useCounterStore().userName = userName.value;
        useCounterStore().signedIn = true;
        useCounterStore().paid = res.data.paid;
        navigate.push("/associate");
      } else {
        invalid.value = true;
        setTimeout(() => {
          invalid.value = false;
        }, 5000);
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
}

const usernameInput = ref(false);
const passwordInput = ref(false);
const boolsArray: Ref<boolean>[] = [usernameInput, passwordInput];

function forgotPassword() {
  //
}

//setup function ends here
</script>
<script lang="ts">
export function show_input_info(
  ev: Event,
  toastVal: number,
  placeholder: string,
  boolsArray: Ref<boolean>[]
) {
  (ev.currentTarget as HTMLInputElement).placeholder = placeholder;
  boolsArray[toastVal].value = !boolsArray[toastVal].value;
}
</script>

<template>
  <main class="flex flex-col place-items-center font-serif">
    <h1
      class="flex-1 flex flex-row place-items-center md:text-4xl text-xl text-sky-600"
    >
      WELCOME <span class="text-green-600">&nbsp; BACK</span>
    </h1>
    <form
      ref="form"
      action=""
      @submit.prevent="signIn"
      class="flex flex-col md:p-4 space-y-2 flex-1 md:w-7/12 lg:w-5/12 text-sm md:text-lg"
    >
      <h2
        class="self-center md:text-3xl underline underline-offset-4 mb-2 decoration-green-900 decoration-1"
      >
        SIGN IN
      </h2>
      <div class="flex flex-row justify-between">
        <label for="userName" class="flex-1">User Name</label>
        <div>
          <transition name="toast-input-info">
            <span
              v-if="usernameInput"
              class="text-xs absolute ml-2 bg-white rounded-md -mt-1 text-slate-500 font-sans px-1"
              >*your user_name</span
            >
          </transition>
          <input
            type="text"
            required
            name="userName"
            @focus="show_input_info($event, 0, '', boolsArray)"
            @focusout="show_input_info($event, 0, 'your user_name', boolsArray)"
            id="userName"
            placeholder="your user_name"
            class="p-1 py-3 placeholder-slate-400 focus:outline-none focus:border-green-500 text-black bg-white border shadow-sm border-slate-300 focus:ring-green-500 focus:shadow-md focus:shadow-green-600 rounded-md focus:ring-1"
            v-model="userName"
          />
        </div>
      </div>
      <div class="flex flex-row justify-between">
        <label for="password" class="flex-1">Password</label>
        <div>
          <transition name="toast-input-info">
            <span
              class="text-xs absolute ml-2 bg-white rounded-md -mt-1 text-slate-500 font-sans px-1"
              v-if="passwordInput"
              >*password</span
            >
          </transition>
          <input
            type="password"
            required
            name="password"
            @focus="show_input_info($event, 1, '', boolsArray)"
            @focusout="show_input_info($event, 1, 'password', boolsArray)"
            id="password"
            placeholder="password"
            class="text-black p-1 py-3 bg-white border shadow-sm placeholder-slate-400 focus:outline-none focus:border-green-500 focus:ring-green-500 focus:shadow-md focus:shadow-green-600 rounded-md focus:ring-1"
            v-model="password"
          />
        </div>
      </div>
      <div class="self-center flex flex-col space-y-3">
        <input
          type="submit"
          value="Submit"
          class="bg-sky-900 p-2 rounded-xl md:text-xl w-fit"
        />
        <!-- <span
          @click="forgotPassword"
          class="hover:text-red-900 text-red-300 w-fit"
          >forgot password?</span
        > -->
        <router-link to="/signUp">
          <button
            class="bg-sky-900 p-2 mb-3 rounded-xl md:text-xl w-fit self-center"
          >
            CREATE ACCOUNT
          </button>
        </router-link>
      </div>
      <div class="flex flex-col">
        <transition name="toast">
          <button
            class="border-slate-500 bg-red-600 p-1 mb-1 rounded-xl w-fit self-center absolute"
            v-if="invalid"
          >
            INVALID NAME OR PASSWORD
          </button>
        </transition>
      </div>
      <google-recaptcha />
    </form>
  </main>
</template>

<style>
.toast-input-info-move,
.toast-input-info-enter-active,
.toast-input-info-leave-active {
  transition: all 1s ease-in-out;
}
.toast-input-info-leave-to,
.toast-input-info-enter-from {
  opacity: 0;
  transform: translateY(5px) scale(1.3);
}
</style>
