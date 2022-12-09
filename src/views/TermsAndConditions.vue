<script lang="ts" setup>
import { ref } from "vue";
import { show_input_info } from "./SignIn.vue";

document.title = "IfIHadInvested Affiliate Program Terms and Conditions";

const affiliate_amount = ref(0);
const number_of_referrals = ref(0);

const affiliateamountInput = ref(false);
const numberofreferralsInput = ref(false);
const totalearningsInput = ref(false);
const boolsArray = [
  affiliateamountInput,
  numberofreferralsInput,
  totalearningsInput,
];

const mpesa_procedures = ref("/media/mpesa01.png");
const mpesa_image_links = [
  "/media/mpesa01.png",
  "/media/mpesa02.png",
  "/media/mpesa03.png",
];
let i = 0;
setInterval(() => {
  if (i === mpesa_image_links.length) i = 0;
  mpesa_procedures.value = mpesa_image_links[i];
  ++i;
}, 5000);
</script>

<template>
  <main class="min-h-screen flex place-items-center">
    <section class="place-items-center flex flex-col w-full">
      <h3
        class="text-xl md:text-4xl underline decoration-sky-600 text-red-600 underline-offset-2 decoration-1 my-4"
      >
        TERMS AND CONDITIONS
      </h3>
      <div class="flex flex-col pl-7 space-y-7">
        <li>
          Your username should be
          <span class="text-xl text-green-400 font-black">unique</span>
        </li>
        <img
          src="/media/user_name.png"
          alt="user name"
          class="border w-5/12 self-center rounded-lg"
        />
        <li>
          Your full names should match the names appearing in your
          <span class="text-xl text-green-400 font-black"
            >registered phone number</span
          >
        </li>
        <img
          src="/media/full_names.png"
          alt="full names"
          class="border w-5/12 self-center rounded-lg"
        />
        <li>
          To complete registration, send
          <span class="text-xl text-green-400 font-black">Ksh. 1</span>
          via MPESA
          <span class="text-xl text-green-400 font-black"
            >pochi-la-biashara</span
          >
          to
          <span class="text-xl text-green-400 font-black">0110178773</span>
          to help verify your phone number and full names
        </li>
        <transition-group appear name="toast" mode="out-in">
          <img
            :src="mpesa_procedures"
            key="me"
            alt="mpesa payment procedure"
            class="w-4/12 self-center"
          />
        </transition-group>
        <li>
          Your sign-up will be processed in less than
          <span class="text-xl text-green-400 font-black">24 hours</span>
        </li>
        <li>
          To start earning, please deposit your selected affiliate amount via
          MPESA
          <span class="text-xl text-green-400 font-black"
            >pochi-la-biashara</span
          >
          to
          <span class="text-xl text-green-400 font-black">0110178773</span>
        </li>
        <li>
          You get a
          <span class="text-xl text-green-400 font-black">70%</span>
          return on every successful referral sign up. Which means after 2
          referrals your account will be running on
          <span class="text-xl text-green-400 font-black">profit</span>.
        </li>
        <div class="flex flex-row justify-between px-4">
          <img
            src="/media/earnings.png"
            alt="withdrawals"
            class="border w-5/12 self-center rounded-lg"
          />
          <form @submi.prevent="" class="flex flex-col w-5/12">
            <h3 class="text-3xl md:text-4xl text-sky-400">Try It Out</h3>
            <label for="affiliate_amount" class="w-fit">Affiliate Amount</label>
            <div class="flex flex-row">
              <transition name="toast-input-info">
                <span
                  class="text-xs absolute ml-8 bg-white rounded-md -mt-1 text-black font-sans px-1"
                  v-if="affiliateamountInput"
                  >*affiliate amount</span
                >
              </transition>
              <font-awesome-icon
                icon="fa-solid fa-money-bill-1-wave"
                class="text-green-600 h-6 flex self-center absolute"
              />
              <input
                type="number"
                @focus="show_input_info($event, 0, '', boolsArray)"
                @focusout="show_input_info($event, 0, '', boolsArray)"
                id="affiliate_amount"
                class="md:w-7/12 rounded-lg text-black p-1 pl-8 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-green-500 focus:ring-green-500 focus:shadow-md focus:shadow-green-600 focus:ring-1"
                v-model="affiliate_amount"
              />
            </div>
            <label for="number_of_referrals" class="w-fit"
              >No. of Referrals</label
            >
            <div class="flex flex-row">
              <transition name="toast-input-info">
                <span
                  class="text-xs absolute ml-8 bg-white rounded-md -mt-1 text-black font-sans px-1"
                  v-if="numberofreferralsInput"
                  >*number of referrals</span
                >
              </transition>
              <font-awesome-icon
                icon="fa-solid fa-user-friends"
                class="text-green-600 h-6 flex self-center absolute"
              />
              <input
                type="number"
                min="0"
                @focus="show_input_info($event, 1, '', boolsArray)"
                @focusout="show_input_info($event, 1, '', boolsArray)"
                id="number_of_referrals"
                class="md:w-7/12 rounded-lg text-black p-1 pl-8 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-green-500 focus:ring-green-500 focus:shadow-md focus:shadow-green-600 focus:ring-1"
                v-model="number_of_referrals"
              />
            </div>
            <label for="total_earnings" class="w-fit">Net Profit</label>
            <div class="flex flex-row">
              <transition name="toast-input-info">
                <span
                  class="text-xs absolute ml-8 bg-white rounded-md -mt-1 text-black font-sans px-1"
                  v-if="totalearningsInput"
                  >*net profit</span
                >
              </transition>
              <font-awesome-icon
                icon="fa-solid fa-sack-dollar"
                class="text-green-600 h-6 flex self-center absolute"
              />
              <input
                type="number"
                min="0"
                @focus="show_input_info($event, 2, '', boolsArray)"
                @focusout="show_input_info($event, 2, '', boolsArray)"
                id="total_earnings"
                :value="
                  0.7 * affiliate_amount * number_of_referrals -
                  affiliate_amount
                "
                class="md:w-7/12 rounded-lg text-black p-1 pl-8 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-green-500 focus:ring-green-500 focus:shadow-md focus:shadow-green-600 focus:ring-1"
              />
            </div>
          </form>
        </div>
        <li>
          Your
          <router-link
            class="underline-offset-4 decoration-red-700 underline hover:text-green-400"
            to="associate"
            >withdrawals</router-link
          >
          are processed in less than
          <span class="text-xl text-green-400 font-black">24 hours</span>
        </li>
        <img
          src="/media/withdrawals.png"
          alt="withdrawals"
          class="border w-5/12 self-center rounded-lg"
        />
        <li>
          <router-link
            class="underline-offset-4 decoration-red-700 underline hover:text-green-400"
            to="associate"
            >Withdrawals</router-link
          >
          can be made on
          <span class="text-xl text-green-400 font-black">any day</span>
          except Sarturday and Sunday
        </li>
        <li>
          You can
          <router-link
            class="underline-offset-4 decoration-red-700 underline hover:text-green-400"
            to="associate"
            >delete</router-link
          >
          your account and
          <router-link
            class="underline-offset-4 decoration-red-700 underline hover:text-green-400"
            to="signUp"
            >re-create</router-link
          >
          a new one
        </li>
        <div class="flex flex-row justify-between px-4 pb-5">
          <img
            src="/media/delete_account.png"
            alt="withdrawals"
            class="border w-5/12 self-center rounded-lg"
          />
          <img
            src="/media/re_create_account.png"
            alt="withdrawals"
            class="border w-5/12 self-center rounded-lg"
          />
        </div>
      </div>
    </section>
  </main>
</template>
