import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ReasonsYouShouldInvestVue from "@/views/ReasonsYouShouldInvest.vue";
import IIIAffiliate from "@/views/IIIAffiliate.vue";
import SignIn from "@/views/SignIn.vue";
import SignUp from "@/views/SignUp.vue";
import AssociateView from "@/views/AssociateView.vue";
import ConfirmSignup from "@/views/ConfirmSignup.vue";
import TopEarners from "@/views/TopEarners.vue";
import ResultsViewVue from "@/views/ResultsView.vue";
import TermsAndConditionsVue from "@/views/TermsAndConditions.vue";
import RecentActivitiesVue from "@/views/RecentActivities.vue";
import ReferralsViewVue from "@/views/ReferralsView.vue";
import ConfirmPaymentVue from "@/views/ConfirmPayment.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/results",
      name: "results",
      component: ResultsViewVue,
    },
    {
      path: "/top10ReasonsToInvest",
      name: "top10ReasonsToInvest",
      component: ReasonsYouShouldInvestVue,
    },
    {
      path: "/IIIAffiliate",
      name: "IIIAffiliate",
      component: IIIAffiliate,
    },
    {
      path: "/confirmRegistration",
      name: "confirmRegistration",
      component: ConfirmPaymentVue,
    },
    {
      path: "/signIn",
      name: "signIn",
      component: SignIn,
    },
    {
      path: "/signUp",
      name: "signUp",
      component: SignUp,
    },
    {
      path: "/affiliateTerms",
      name: "affiliateTerms",
      component: TermsAndConditionsVue,
    },
    {
      path: "/investorPreviousActivities",
      name: "investorPreviousActivities",
      component: RecentActivitiesVue,
    },
    {
      path: "/referrals",
      name: "referrals",
      component: ReferralsViewVue,
    },
    {
      path: "/associate",
      name: "associate",
      component: AssociateView,
    },
    {
      path: "/topEarners",
      name: "topEarners",
      component: TopEarners,
    },
    {
      path: "/confirmSignup",
      name: "confirmSignup",
      component: ConfirmSignup,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "notFound",
      component: () => import("@/views/NotFoundView.vue"),
    },
  ],
});

export default router;
