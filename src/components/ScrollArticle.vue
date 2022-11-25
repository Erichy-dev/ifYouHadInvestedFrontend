<script lang="ts" setup>
import { ref } from "vue";
import type { Ref } from "vue";

const navigateToTop: Ref<HTMLElement | null> = ref(null);
const showNavigateTop = ref(false);
const showNavigateBottom = ref(true);
const footerHeight = 700;
document.addEventListener("scroll", () => {
  window.scrollY >= 100
    ? (showNavigateTop.value = true)
    : (showNavigateTop.value = false);
  window.scrollY >= document.body.offsetHeight - footerHeight
    ? (showNavigateBottom.value = false)
    : (showNavigateBottom.value = true);
});
</script>

<template>
  <main>
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
