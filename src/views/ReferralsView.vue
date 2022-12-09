<script lang="ts" setup>
import { ref, watch } from "vue";
import type { Ref } from "vue";
import axios from "axios";
import { useCounterStore } from "../stores/counter";
import ToastFormError from "@/components/ToastFormError.vue";

document.title = "Investor's Refferals";

type referralsSchema = {
  fields: {
    referral: string;
    date_added: string;
  };
};
const referrals: Ref<referralsSchema[]> = ref([]);
const textSize = ref("text-4xl");

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
axios({
  method: "get",
  url: "associates/referrals",
  params: { user_name: useCounterStore().userName },
})
  .then((res) => {
    switch (res.data) {
      case "Invalid Investor":
        toggleFormError("Make sure you're signed In");
        break;
      case "No referrals":
        toggleFormError("You have no referrals. Let's get to work investor.");
        break;

      default:
        referrals.value = res.data;
        break;
    }
  })
  .catch((err) => {
    console.log(err.message);
  });
</script>

<template>
  <main class="flex flex-col self-center md:w-7/12 lg:w-5/12">
    <h1
      class="text-xl md:text-4xl self-center flex-1 flex place-items-center my-5 text-sky-600"
    >
      Your Referrals
    </h1>
    <form
      @submit.prevent=""
      class="flex flex-col flex-1 p-2 text-sm md:text-xl text-green-600 space-y-10"
    >
      <div
        class="flex flex-col text-white"
        v-for="task in referrals"
        :key="task.fields.date_added"
      >
        <p>{{ new Date(task.fields.date_added).toLocaleString() }}</p>
        <p class="text-orange-600">Referred {{ task.fields.referral }}</p>
      </div>
      <ToastFormError
        :form-error="formError"
        :form-invalid="formInvalid"
        :text-size="textSize"
      />
    </form>
  </main>
</template>
