<script lang="ts" setup>
import HeadingVue from "@/components/ReasonsToInvest/HeadingVue.vue";
import TableOfContents from "@/components/ReasonsToInvest/TableOfContents.vue";
import CashIsTrash from "@/components/ReasonsToInvest/CashIsTrash.vue";
import GrowYourMOney from "@/components/ReasonsToInvest/GrowYourMoney.vue";
import IntroductionVue from "@/components/ReasonsToInvest/IntroductionVue.vue";
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
import ScrollArticle from "@/components/ScrollArticle.vue";

document.title =
  "Top 10 Reasons You Should Invest in The Stock Market 2022 And The Risks Involved";
</script>

<template>
  <main class="bg-white text-black p-4 font-normal leading-loose text-lg">
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
    <ScrollArticle />
  </main>
</template>
