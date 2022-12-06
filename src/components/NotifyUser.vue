<script lang="ts" setup>
import { ref, computed } from "vue";
import { useCounterStore } from "@/stores/counter";

const userPaid = computed(() => !useCounterStore().paid);
const trueNotify = ref(true);
/**
 * toggles the notification alert message.
 */
function notifyUser() {
  trueNotify.value = !trueNotify.value;
}
if(trueNotify.value && useCounterStore().signedIn && userPaid.value) console.log("yoh")
</script>

<template>
  <main>
    <transition-group appear name="notify-user">
      <font-awesome-icon
        icon="fa-solid fa-bell"
        id="bell"
        class="fixed right-5 bottom-5 text-4xl text-red-600 notifylink"
        v-if="trueNotify && useCounterStore().signedIn && userPaid"
        @click="notifyUser"
      />
      <section
        class="right-5 bottom-5 w-6/12 md:w-4/12 lg:w-2/12 flex-col place-items-center rounded-md fixed border bg-black font-serif space-y-4 py-10 px-4"
        v-if="!trueNotify"
      >
        <div class="flex flex-row justify-between w-full">
          <h2
            class="text-sky-600 font-black underline underline-offset-4 decoration-sky-600 text-xl"
          >
            NOTICE
          </h2>
          <font-awesome-icon
            icon="fa-solid fa-window-close"
            class="text-red-600 text-lg"
            @click="notifyUser"
          />
        </div>
        <p class="text-green-300">
          Please complete your
          <router-link
            class="decoration-red-600 underline-offset-4 underline hover:text-red-600"
            to="/associate"
            >registration</router-link
          >
          to start
          <router-link
            class="decoration-red-600 underline-offset-4 underline hover:text-red-600"
            to="/topEarners"
            >earning</router-link
          >
          from the
          <router-link
            class="decoration-red-600 underline-offset-4 underline hover:text-red-600"
            to="IIIAffiliate"
            >affiliate program.</router-link
          >
        </p>
      </section>
    </transition-group>
  </main>
</template>

<style>
.notify-user-leave-active,
.notify-user-enter-active {
  transition: all 1s ease-out;
}
.notify-user-leave-to,
.notify-user-enter-from {
  opacity: 0;
  transform: rotate(-180deg) scale(0.1, 0.1);
}
@keyframes ring {
  0% {
    transform: rotate(0deg);
  }
  10% {
    transform: rotate(-50deg);
  }
  20% {
    transform: rotate(50deg);
  }
  30% {
    transform: rotate(-50deg);
  }
  40% {
    transform: rotate(50deg);
  }
  50% {
    transform: rotate(0deg);
  }
}
#bell {
  animation-direction: normal;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  animation-duration: 1300ms;
  animation-name: ring;
}
</style>
