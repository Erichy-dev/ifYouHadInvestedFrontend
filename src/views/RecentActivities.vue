<script lang="ts" setup>
import { ref } from "vue";
import type { Ref } from "vue";
import { useCounterStore } from '@/stores/counter';
import axios from "axios";

type recentActivitiesSchema = {
  fields: {
    activity: string;
    date_added: string;
  };
};
const recentActivities: Ref<recentActivitiesSchema[]> = ref([]);
const form = new FormData();
form.append("userName", useCounterStore().userName);
axios({
  method: "post",
  url: "associates/recentActivities",
  data: form,
})
  .then((res) => {
    recentActivities.value = res.data;
  })
  .catch((err) => {
    console.log(err.message);
  });
</script>

<template>
  <main class="flex flex-col self-center md:w-7/12 lg:w-5/12">
    <h1 class="text-xl md:text-4xl self-center flex-1 flex place-items-center my-5">
      <span class="text-sky-600">Your Recent Activities</span>
    </h1>
    <form
      @submit.prevent=""
      class="flex flex-col flex-1 p-2 text-sm md:text-xl text-green-600 space-y-10"
    >
      <div
        class="flex flex-col text-white"
        v-for="task in recentActivities"
        :key="task.fields.date_added"
      >
        <p>{{ new Date(task.fields.date_added).toLocaleString() }}</p>
        <p class="text-orange-600">{{ task.fields.activity }}</p>
      </div>
    </form>
  </main>
</template>
