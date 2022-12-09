<script lang="ts" setup>
import { ref } from "vue";

document.title = "Confirm Sign Up";
</script>

<template>
  <main class="flex flex-col self-center md:w-7/12 lg:w-5/12">
    <h1
      class="text-xl md:text-4xl self-center flex-1 flex text-sky-600 place-items-center"
    >
      CONFIRM SIGN UP
    </h1>
    <div class="flex-1 place-items-center font-normal">
      <p class="">
        Kindly send
        <span
          class="text-xl text-sky-300 font-serif font-black underline underline-offset-2 decoration-red-700"
          >Ksh. 1</span
        >
        to
        <span
          class="text-xl text-sky-300 font-black underline underline-offset-2 decoration-red-700"
          >0110178773</span
        >
        to:
      </p>
      <ul class="list-disc pl-6">
        <li>confirm your PHONE NUMBER and FULL NAMES.</li>
        <li>Activate your REFERRAL LINK</li>
      </ul>
      <p class="text-red-700 my-1">
        Your Sign Up will be processed within 24 hours.
      </p>
    </div>
  </main>
</template>
