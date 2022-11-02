<script lang="ts" setup>
import { useCounterStore } from "@/stores/counter";
import { ref, computed } from "vue";

document.title = "Results for Investments on my Stock - Eric Nyaga";

const date = ref(new Date());
date.value.setFullYear(date.value.getFullYear() - 1);
const investmentDate =
  date.value.toLocaleString("en-us", { month: "long" }) +
  " " +
  date.value.getFullYear();
const amount = computed(() => useCounterStore().amount);
const stock = computed(() => useCounterStore().stock);
const profitLoss = computed(() => useCounterStore().profitLoss);
const percentageGainLoss = computed(() => useCounterStore().percentageGainLoss);
const totalGainLoss = computed(() => useCounterStore().totalGainLoss);
const lossBoolean = computed(() => useCounterStore().lossBoolean);
const ownedSuperYatchs = computed(() =>
  Math.round(totalGainLoss.value / 1000000)
);
</script>

<template>
  <main class="text-lg flex flex-col py-20">
    <section class="self-center">
      <h1>
        How much money would you have made on
        <span class="text-green-900">{{ stock }}?</span>
      </h1>
      <p class="flex flex-col space-y-3">
        <span
          >If you had bought:
          <span class="text-green-900">${{ amount }}</span></span
        >
        <span
          >Into {{ stock }} on
          <span class="text-green-900">{{ investmentDate }}</span></span
        >
        <span
          >You would have <span v-if="!lossBoolean">made</span
          ><span v-if="lossBoolean">lost</span>:
          <span class="text-green-900">{{ profitLoss }}$</span></span
        >
        <span
          >Your Annual Rate of <span v-if="!lossBoolean">Return</span
          ><span v-if="lossBoolean">Loss</span> would be:
          <span class="text-green-900">{{ percentageGainLoss }}%</span></span
        >
        <span
          >Final Amount:
          <span class="text-green-900">{{ totalGainLoss }}$</span></span
        >
        <span
          >With that much money you could have bought:
          <span class="text-green-900"
            >{{ ownedSuperYatchs }} Super-yatches.</span
          ></span
        >
      </p>
      <p class="mt-10">
        Share your results:<br />
        <button class="hover:underline ml-10 p-1">Copy link</button>
      </p>
      <div class="mt-5 ml-20">
        <router-link to="/"
          ><button class="w-fit bg-green-900 p-2 rounded-lg">
            Try Again
          </button></router-link
        >
      </div>
    </section>
  </main>
</template>
