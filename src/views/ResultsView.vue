<script lang="ts" setup>
import { useCounterStore } from "@/stores/counter";
import { ref, computed } from "vue";
import type { Ref } from "vue";
import axios from "axios";

document.title = "Results for my Stock Investments - Eric Nyaga";

const date = ref(new Date());
date.value.setFullYear(date.value.getFullYear() - 1);
const amount = computed(() => useCounterStore().amount);
const stock = computed(() => useCounterStore().stock);
const dateSelected = computed(() => useCounterStore().dateSelected);
const profitLoss = computed(() => useCounterStore().profitLoss);
const percentageGainLoss = computed(() => useCounterStore().percentageGainLoss);
const totalGainLoss = computed(() => useCounterStore().totalGainLoss);
const lossBoolean = computed(() => useCounterStore().lossBoolean);

interface YatchSchema {
  fields: {
    name: string;
    price: number;
    imagePath: string;
    imageUrl: string;
  };
}
const yatchsArray: Ref<YatchSchema[] | null> = ref(null);
axios({
  method: "get",
  url: "superYatchs/superYatchs",
})
  .then((res) => {
    yatchsArray.value = res.data;
  })
  .catch((err) => {
    console.log(err.message);
  });
</script>

<template>
  <main class="text-lg flex flex-col self-center md:w-8/12 lg:w-5/12 mt-10 p-4">
    <h1 class="text-4xl font-bold self-center mb-5 font-serif">RESULTS</h1>
    <p class="flex flex-col space-y-3">
      <span
        >If you had bought:
        <span class="text-green-900"
          >${{ amount.toLocaleString("USA") }}</span
        ></span
      >
      <span
        >Into <span class="text-green-900">{{ stock }}</span> on
        <span class="text-green-900">{{ dateSelected }}</span></span
      >
      <span
        >You would have <span v-if="!lossBoolean">made</span
        ><span v-if="lossBoolean">lost</span>:
        <span class="text-green-900"
          >${{ profitLoss.toLocaleString("USA") }}</span
        ></span
      >
      <span
        >Your Annual Rate of <span v-if="!lossBoolean">Return</span
        ><span v-if="lossBoolean">Loss</span> would be:
        <span class="text-green-900">{{ percentageGainLoss }}%</span></span
      >
      <span
        >Final Amount:
        <span class="text-green-900"
          >${{ totalGainLoss.toLocaleString("USA") }}</span
        ></span
      >
      <span>With your total gains you'd have bought: </span>
    </p>
    <div v-if="yatchsArray" class="mt-5 text-sm md:text-lg">
      <div
        class="flex flex-row"
        v-for="yatch in yatchsArray"
        :key="yatch.fields.name"
      >
        <div class="w-4/12 p-2">
          <transition name="toast" appear>
            <img
              :src="yatch.fields.imagePath"
              alt="if i had invested calculations of the super-yatch(s) you could have bought from your investment returns"
              class="rounded-full"
            />
          </transition>
        </div>
        <div class="flex flex-col place-content-center p-1">
          <h3>
            {{ yatch.fields.name }} - ${{
              yatch.fields.price.toLocaleString("USA")
            }}
          </h3>
          <p>
            You'd possess {{ Math.floor(totalGainLoss / yatch.fields.price) }}
            <a
              :href="yatch.fields.imageUrl"
              class="underline decoration-green-900 hover:decoration-green-400 underline-offset-4 hover:text-green-400"
              >{{ yatch.fields.name }}</a
            >
          </p>
        </div>
      </div>
    </div>
    <p class="mt-10">
      Share your results:<br />
      <button class="hover:underline ml-10 p-1">Copy link</button>
    </p>
    <div class="mt-5 ml-20">
      <router-link to="/"
        ><button
          class="w-fit bg-gradient-to-tr from-slate-600 to-green-900 p-2 rounded-lg hover:-translate-y-2 hover:translate-x-2 transition-all duration-1000"
        >
          Try Again
        </button></router-link
      >
    </div>
  </main>
</template>
