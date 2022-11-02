import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", () => {
  const count = ref(0);
  const stockList = ref([]);
  const stock = ref("");
  const amount = ref(0);
  const percentageGainLoss = ref(0);
  const profitLoss = ref(0);
  const totalGainLoss = ref(0);
  const lossBoolean = ref(false);
  const doubleCount = computed(() => count.value * 2);
  function increment() {
    count.value++;
  }

  return {
    count,
    doubleCount,
    increment,
    stockList,
    profitLoss,
    stock,
    amount,
    percentageGainLoss,
    totalGainLoss,
    lossBoolean,
  };
});
