<script lang="ts" setup>
import { ref } from "vue";
import type { Ref } from "vue";
import { useCounterStore } from "../stores/counter";

import HeadingVue from "@/components/ReasonsToInvest/HeadingVue.vue";
import TableOfContents from "@/components/ReasonsToInvest/TableOfContents.vue";
import CashIsTrash from "@/components/ReasonsToInvest/CashIsTrash.vue";
import GrowYourMOney from "@/components/ReasonsToInvest/GrowYourMoney.vue";
import IntroductionVue from "@/components/ReasonsToInvest/GrowYourMoney.vue";
import HistoricallyGoneUp from "@/components/ReasonsToInvest/HistoricallyGoneUp.vue";
import PowerOfCompounding from "@/components/ReasonsToInvest/PowerOfCompounding.vue";
import EarnMore from "@/components/ReasonsToInvest/EarnMore.vue";
import EasyToUnderstand from "@/components/ReasonsToInvest/EasyToUnderstand.vue";
import FavorableTax from "@/components/ReasonsToInvest/FavorableTax.vue";
import DiversifyInvestments from "@/components/ReasonsToInvest/DiversifyInvestments.vue";
import StartSmall from "@/components/ReasonsToInvest/StartSmall.vue";
import MakeMoneyTwoWays from "@/components/ReasonsToInvest/MakeMoneyTwoWays.vue";
import RisksInStockMarket from "@/components/ReasonsToInvest/RisksInStockMarket.vue";
import ThoughtsTakeAways from "@/components/ReasonsToInvest/ThoughtsTakeAways.vue";
import FAQs from "@/components/ReasonsToInvest/FAQsVue.vue";
import DisclaimerVue from "@/components/ReasonsToInvest/DisclaimerVue.vue";

document.title =
  "Top 10 Reasons You Should Invest in The Stock Market 2022 And The Risks Involved - Eric Nyaga";

const navigateToTop: Ref<HTMLElement | null> = ref(null);
const showNavigateTop = ref(false);
const showNavigateBottom = ref(true);
document.addEventListener("scroll", () => {
  window.scrollY >= 100
    ? (showNavigateTop.value = true)
    : (showNavigateTop.value = false);
  window.scrollY >=
  document.body.offsetHeight - (useCounterStore().footerPosition + 150)
    ? (showNavigateBottom.value = false)
    : (showNavigateBottom.value = true);
});
</script>

<template>
  <main class="bg-zinc-200 text-black p-4 font-normal leading-loose text-lg">
    <section>
      <HeadingVue />
      <TableOfContents />
      <IntroductionVue />
      <section>
        <h2 class="font-bold text-2xl my-8" id="reasonsToINvest">
          Top 10 Reasons You Should Invest In The Stock Market 2022
        </h2>
        <GrowYourMOney />
        <CashIsTrash />
        <HistoricallyGoneUp />
        <PowerOfCompounding />
        <EarnMore />
        <EasyToUnderstand />
        <FavorableTax />
        <DiversifyInvestments />
        <StartSmall />
        <MakeMoneyTwoWays />
        <RisksInStockMarket />
        <ThoughtsTakeAways />
        <FAQs />
        <DisclaimerVue />
      </section>
    </section>
    <transition name="scrollArticle">
      <a
        href="#"
        class="fixed w-fit bottom-0 right-0 m-10 bg-cyan-800 text-3xl px-2 font-bold rounded-md"
        v-if="showNavigateTop"
        ref="navigateToTop"
      >
        <font-awesome-icon
          icon="fa-solid fa-caret-up"
          class="text-orange-600 h-8"
        />
      </a>
    </transition>
    <transition name="scrollArticle">
      <a
        href="#footer"
        v-if="showNavigateBottom"
        class="fixed w-fit bottom-10 right-0 m-10 bg-cyan-800 text-3xl px-2 font-bold rounded-md"
      >
        <font-awesome-icon
          icon="fa-solid fa-caret-down"
          class="text-orange-600 h-8"
        />
      </a>
    </transition>
  </main>
</template>

<style scoped>
.scrollArticle-move,
.scrollArticle-enter-active,
.scrollArticle-leave-active {
  transition: all 1s ease;
}
.scrollArticle-enter-from,
.scrollArticle-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
