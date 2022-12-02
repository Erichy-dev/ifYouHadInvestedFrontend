<script lang="ts" setup>
import axios from "axios";
import { ref } from "vue";
import type { Ref } from "vue";

const dateToday = ref(new Date().toLocaleString());

type TopEarnersSchema = {
  fullNames: string;
  earned: number;
};
const topEarners: Ref<TopEarnersSchema[]> = ref([]);

axios({
  method: "get",
  url: "associates/topEarners",
})
  .then((res) => {
    topEarners.value = res.data;
  })
  .catch((err) => {
    console.log(err.message);
  });
</script>

<template>
  <main class="flex flex-col self-center md:w-7/12 lg:w-5/12">
    <h1
      class="text-xl md:text-5xl self-center flex-1 flex flex-col place-items-center justify-center"
    >
      <span class="text-sky-600 mb-3">Top Earners</span>
      <span class="text-green-600 text-base"
        >{{ dateToday
        }}<font-awesome-icon icon="fa-solid fa-briefcase-clock" class="ml-2"
      /></span>
    </h1>
    <form
      @submit.prevent=""
      class="flex flex-col p-2 space-y-1 text-sm md:text-xl flex-1 text-green-600"
    >
      <div
        class="flex flex-row justify-between border-b-2 border-sky-600 text-xl md:text-2xl text-white"
      >
        <h3>INVESTOR</h3>
        <h3>AMOUNT(Ksh)</h3>
      </div>
      <div
        class="flex flex-row justify-between border-b-2 border-sky-600"
        v-for="topEarner in topEarners"
        :key="topEarner.fullNames"
      >
        <h3>{{ topEarner.fullNames }}</h3>
        <h3>{{ topEarner.earned }}</h3>
      </div>
    </form>
  </main>
</template>
