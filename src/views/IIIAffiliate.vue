<script lang="ts" setup>
import { computed } from "vue";
import { useCounterStore } from "../stores/counter";
import axios from "axios";
import ScrollArticleVue from "@/components/ScrollArticle.vue";

document.title = "III-Affiliate program";

const signedIn = computed(() => useCounterStore().signedIn);

function signOut() {
  axios({
    method: "post",
    url: "associates/signOut",
  })
    .then((res) => {
      if (res.data !== "None") {
        useCounterStore().signedIn = false;
        useCounterStore().userName = "";
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
}
</script>

<template>
  <main class="bg-white flex flex-col text-black md:px-20 lg:px-40 space-y-6">
    <div
      v-show="true"
      key="obj1"
      class="min-h-screen flex flex-col space-y-6 mt-6"
    >
      <div
        class="flex-1 bg-[url('/media/affiliate.jpg')] bg-cover bg-center text-white flex flex-col md:text-3xl font-serif"
      >
        <div class="flex flex-row place-items-center flex-1 self-center">
          <div class="flex flex-col place-items-center space-y-5">
            <h2 class="flex flex-col">
              <span>Recommend Us And</span
              ><span class="self-center">Earn$</span>
            </h2>
            <div class="text-black flex flex-row font-serif">
              <router-link
                class="bg-gradient-to-tr from-slate-600 to-green-900 font-black rounded-lg p-1 mr-4 hover:translate-y-1 hover:shadow-md duration-1000 hover:drop-shadow-xl hover:shadow-slate-700 transition-all transform-cpu"
                to="/signIn"
                v-if="!signedIn"
                >Sign In</router-link
              >
              <button
                v-if="signedIn"
                class="bg-gradient-to-tr from-slate-600 to-green-900 font-black rounded-lg p-1 mr-4 hover:translate-y-1 hover:shadow-md duration-1000 hover:drop-shadow-xl hover:shadow-slate-700 transition-all transform-cpu"
                @click="signOut"
              >
                Sign Out
              </button>
              <router-link
                class="bg-gradient-to-tr from-slate-600 to-green-900 font-black rounded-lg p-1 hover:translate-y-1 hover:shadow-md duration-1000 hover:drop-shadow-xl hover:shadow-slate-700 transition-all transform-cpu"
                to="/signUp"
                v-if="!signedIn"
                >Sign Up</router-link
              >
            </div>
            <router-link
              class="bg-gradient-to-tr from-sky-600 to-green-900 font-black rounded-lg p-1 hover:translate-y-1 hover:shadow-md duration-1000 hover:drop-shadow-xl hover:shadow-slate-700 transition-all transform-cpu text-4xl"
              to="/topEarners"
              >Top Earners</router-link
            >
            <router-link
              to="/affiliateTerms"
              class="underline decoration-sky-600 text-red-600 underline-offset-2 decoration-1"
              >Terms And conditions</router-link
            >
          </div>
        </div>
      </div>
      <div class="flex-1 flex flex-col px-2">
        <h2 class="text-xl md:text-4xl flex-1 flex flex-row place-items-center">
          IfIHadInvested Affiliate Marketing Program
        </h2>
        <p class="font-normal flex flex-row flex-1">
          Welcome to the largest affiliate marketing program in Kenya.
          IfIHadInvested Associates Program helps content creators, publishers
          and bloggers monetize their traffic. Associates use easy link-building
          tools to direct their audience to their recommendations, and earn from
          qualifying sign-ups.
        </p>
      </div>
    </div>
    <div v-show="true" key="obj2" class="min-h-screen flex flex-col">
      <div
        class="flex flex-col md:flex-row md:space-x-5 lg:space-x-7 flex-1 font-normal mb-5 px-2"
      >
        <div class="flex flex-col flex-1">
          <img src="/media/signUp.png" alt="" class="flex-1" />
          <p class="flex-1">
            Join hundreds of creators, publishers and bloggers who are earning
            with the IfIHadInvested Associates Program.
          </p>
        </div>
        <div class="flex flex-col flex-1">
          <img src="/media/recommend.png" alt="" class="flex-1" />
          <p class="flex-1">
            Share your links with your audience. We have customized linking
            tools for large publishers, individual bloggers and social media
            influencers.
          </p>
        </div>
        <div class="flex flex-col flex-1">
          <img src="/media/earn.png" alt="" class="flex-1" />
          <p class="flex-1">
            Earn up to 10% in associate commisions from qualifying sign-ups. Our
            competitive conversion rates help maximize earnings.
          </p>
        </div>
      </div>
      <div
        id="reviews"
        class="flex-1 bg-[url('/media/reviews.jpg')] bg-center bg-cover text-white p-5"
      >
        <p>
          “Since we have a global audience, the Associates Program has helped us
          to scale our earnings internationally. It's been simple to sign up,
          expand and use!”
        </p>
        <p>CEO Alphy</p>
      </div>
    </div>
    <div v-show="true" key="obj3" class="min-h-screen flex flex-col px-2">
      <div class="flex flex-col flex-1">
        <h3 class="text-2xl md:text-4xl mb-6">Frequently Asked Questions</h3>
        <div class="flex flex-col md:flex-row">
          <div class="flex-1">
            <h4>How does the Associates Program work?</h4>
            <p class="font-normal">
              You can share your affiliate link with your audience and earn
              money on qualifying sign-ups.
            </p>
          </div>
          <div class="flex-1">
            <h4>How do I earn in this program?</h4>
            <p class="font-normal">
              You earn from qualifying sign-ups through the traffic you drive to
              IfIHadInvested.
            </p>
          </div>
        </div>
        <div class="flex flex-col md:flex-row">
          <div class="flex-1">
            <h4>How do I qualify for this program?</h4>
            <p class="font-normal">
              Bloggers, publishers, content creators and influencers with an
              established social media following qualify for this program.
            </p>
            <p class="font-normal"></p>
          </div>
          <div class="flex-1">
            <h4>How do I sign up to the program?</h4>
            <p class="font-normal">
              Sign up to the program
              <router-link class="text-green-600 underline" to="/signUp"
                >here</router-link
              >
            </p>
          </div>
        </div>
      </div>
      <div class="flex flex-col md:flex-row flex-1 md:mb-10 my-10 md:my-0">
        <div
          class="flex-1 md:border-r-2 mr-4 flex flex-row place-items-center text-xl md:text-2xl"
        >
          <h2>IfIHadInvested<span class="text-green-500">Associates</span></h2>
        </div>
        <div class="flex-1 font-normal self-center flex flex-col">
          <h3 class="md:text-3xl text-xl mb-5">
            Recommend Site. Earn Commissions
          </h3>
          <div class="text-black mt-5 flex flex-row font-serif self-center">
            <router-link
              class="bg-gradient-to-tr from-slate-600 to-green-900 font-black rounded-lg p-1 mr-4 hover:translate-y-1 hover:shadow-md duration-1000 hover:drop-shadow-xl hover:shadow-slate-700 transition-all transform-cpu"
              to="/signIn"
              >Sign In</router-link
            >
            <button
              v-if="signedIn"
              class="bg-gradient-to-tr from-slate-600 to-green-900 font-black rounded-lg p-1 mr-4 hover:translate-y-1 hover:shadow-md duration-1000 hover:drop-shadow-xl hover:shadow-slate-700 transition-all transform-cpu"
            >
              Sign Out
            </button>
            <router-link
              class="bg-gradient-to-tr from-slate-600 to-green-900 font-black rounded-lg p-1 hover:translate-y-1 hover:shadow-md duration-1000 hover:drop-shadow-xl hover:shadow-slate-700 transition-all transform-cpu"
              to="/signUp"
              >Sign Up</router-link
            >
          </div>
        </div>
      </div>
    </div>
    <ScrollArticleVue />
  </main>
</template>

<style>
.toast-article-leave-active,
.toast-article-enter-active {
  transition: all 0.8s ease-out;
}
.toast-article-leave-to,
.toast-article-enter-from {
  opacity: 0;
  transform: rotateY(90deg) scale(0.9, 0.9);
}
</style>
