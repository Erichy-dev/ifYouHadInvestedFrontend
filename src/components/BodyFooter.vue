<script lang="ts" setup>
import { onMounted } from "vue";
import { useCounterStore } from "@/stores/counter";

onMounted(() => {
  useCounterStore().footerPosition = document.body.scrollHeight;
});
</script>

<template>
  <main
    class="border-t-2 border-slate-600 flex flex-col place-items-center py-4 italic text-sm px-2"
    id="footer"
  >
    <h2>
      Crafted by
      <a
        href="https://github.com/Erichy-dev"
        class="hover:underline hover:decoration-green-900 underline-offset-4 text-green-400 font-bold font-serif"
        >riki</a
      >
      using
      <a
        href="https://vuejs.org/"
        class="hover:underline hover:decoration-green-900 underline-offset-4 text-green-400 font-serif"
        >VueJs</a
      >,
      <a
        href="https://tailwindcss.com/"
        class="hover:underline hover:decoration-green-900 underline-offset-4 text-green-400 font-serif"
        >Tailwind</a
      >
      and
      <a
        href="https://www.djangoproject.com/"
        class="hover:underline hover:decoration-green-900 underline-offset-4 text-green-400 font-serif"
        >Django</a
      >
    </h2>
    <span>CopyWright @2022</span>
  </main>
</template>
