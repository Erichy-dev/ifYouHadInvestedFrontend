import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", () => {
  const stockList = ref([]);
  const dateSelected = ref("");
  const stock = ref("");
  const amount = ref(0);
  const percentageGainLoss = ref(0);
  const profitLoss = ref(0);
  const totalGainLoss = ref(0);
  const lossBoolean = ref(false);
  const moreStocksMultiply = ref(0);
  const footerPosition = ref(0);

  return {
    stockList,
    dateSelected,
    profitLoss,
    stock,
    amount,
    percentageGainLoss,
    totalGainLoss,
    lossBoolean,
    moreStocksMultiply,
    footerPosition,
  };
});
