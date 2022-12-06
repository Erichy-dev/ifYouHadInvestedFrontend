<script lang="ts" setup>
import { ref } from "vue";

function confirmRegistration() {
  //
}
</script>

<template>
  <main class="flex flex-col place-items-center font-serif">
    <h1
      class="flex-1 flex flex-row place-items-center md:text-4xl text-xl text-sky-600"
    >
      CONFIRM REGISTRATION
    </h1>
    <form
      ref="form"
      action=""
      @submit.prevent="confirmRegistration"
      class="flex flex-col md:p-4 space-y-2 flex-1 md:w-7/12 lg:w-5/12 text-sm md:text-lg"
    >
      <div class="flex flex-col space-y-2">
        <label class="w-fit" for="mpesaMessage"
          >Please paste your MPESA message here</label
        >
        <textarea
          id="mpesaMessage"
          name="mpesaMessage"
          rows="5"
          required
          class="text-white p-1 bg-slate-500 border shadow-sm border-sky-600 placeholder-slate-400 focus:outline-none focus:border-green-500 focus:ring-green-500 focus:shadow-md focus:shadow-green-600 rounded-md focus:ring-1 md:w-9/12 bg-opacity-20"
        ></textarea>
        <input
          type="submit"
          value="Submit"
          class="bg-sky-900 p-2 rounded-xl md:text-xl w-fit"
        />
      </div>
    </form>
  </main>
</template>
