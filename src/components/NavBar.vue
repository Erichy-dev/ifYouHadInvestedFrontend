<script lang="ts" setup>
import { computed, ref, onMounted } from "vue";
import { useCounterStore } from "../stores/counter";

const signedIn = computed(() => useCounterStore().signedIn);

const toggleNavIf = ref(false);
const guide = ref<HTMLElement | null>(null);
const checkGuide = ref<boolean>(true);
const guideClass = [
  "absolute",
  "bg-opacity-80",
  "bg-black",
  "z-40",
  "flex-col",
  "top-14",
  "font-extrabold",
  "border-b",
  "border-b-green-400",
  "w-screen",
  "py-1",
  "space-y-2",
  "place-items-center",
];
function toggleGuide() {
  if (checkGuide.value) {
    guide.value?.classList.add(...guideClass);
    toggleNavIf.value = true;
    checkGuide.value = false;
  } else {
    toggleNavIf.value = false;
    setTimeout(() => {
      guide.value?.classList.remove(...guideClass);
    });
    checkGuide.value = true;
  }
}
onMounted(() => {
  window.addEventListener("click", outsideToggle);
});
function outsideToggle(e: Event) {
  const toggleGuide = document.getElementsByClassName("toggleGuide")[0];
  const pathElem = document.getElementsByTagName("path")[0];
  if (!checkGuide.value) {
    const guide = document.getElementById("guide");
    if (
      !guide?.contains(e.target as HTMLElement) &&
      e.target != toggleGuide &&
      e.target != pathElem
    ) {
      toggleNavIf.value = false;
      setTimeout(() => {
        (guide as HTMLElement).classList.remove(...guideClass);
      });
      checkGuide.value = true;
    }
  }
}
if (window.innerWidth >= 768) {
  toggleNavIf.value = true;
}
</script>

<template>
  <main class="flex flex-row mt-5 border-b-2 border-slate-300 pb-5" id="navBar">
    <div class="flex-1 flex flex-col">
      <h1
        class="text-lg md:text-2xl lg:text-4xl font-bold font-serif shadow-green-600 shadow-lg drop-shadow-lg self-center"
      >
        IF I HAD INVESTED
      </h1>
    </div>
    <font-awesome-icon
      icon="fa-solid fa-bars"
      class="text-green-400 h-5 mr-2 toggleGuide md:hidden border border-green-400 rounded-md p-1 shadow-lg drop-shadow-lg"
      @click="toggleGuide"
    />
    <transition name="toastNav">
      <div
        class="flex md:flex-row px-1 text-xs flex-1"
        ref="guide"
        id="guide"
        v-show="toggleNavIf"
      >
        <router-link class="flex-1" to="/">
          <button
            class="lg:px-6 font-bold bg-gradient-to-tr from-slate-600 to-green-900 rounded-xl p-2 underline-offset-4 hover:translate-y-2 hover:rotate-6 transition-all duration-1000"
          >
            HOME
          </button>
        </router-link>
        <router-link class="flex-1" to="/top10ReasonsToInvest">
          <button
            class="lg:px-6 font-bold bg-gradient-to-tr from-slate-600 to-green-900 rounded-xl p-2 underline-offset-4 hover:translate-y-2 hover:rotate-6 transition-all duration-1000"
          >
            BLOG
          </button>
        </router-link>
        <router-link class="flex-1" to="/IIIAffiliate">
          <button
            class="lg:px-6 font-bold bg-gradient-to-tr from-slate-600 to-green-900 rounded-xl p-2 underline-offset-4 hover:translate-y-2 hover:rotate-6 transition-all duration-1000"
          >
            AFFILIATE
          </button>
        </router-link>
        <router-link class="flex-1" to="/about">
          <button
            class="lg:px-6 font-bold bg-gradient-to-tr from-slate-600 to-green-900 rounded-xl p-2 underline-offset-4 hover:translate-y-2 hover:rotate-6 transition-all duration-1000"
          >
            ABOUT
          </button>
        </router-link>
        <transition name="toastNav" appear>
          <router-link
            to="/associate"
            v-if="signedIn"
            class="mr-1 flex flex-col"
          >
            <font-awesome-icon
              icon="fa-solid fa-user"
              class="h-10 text-sky-700"
            />
            <p class="text-sm text-orange-600 font-black">
              {{ useCounterStore().userName.substring(0, 5) + ".." }}
            </p>
          </router-link>
        </transition>
      </div>
    </transition>
  </main>
</template>

<style>
.toastNav-move,
.toastNav-enter-active {
  transition: all 1s ease-in-out;
}
.toastNav-leave-active {
  position: absolute;
}
.toastNav-enter-from {
  opacity: 0;
  transform: translateX(20px);
}
</style>
