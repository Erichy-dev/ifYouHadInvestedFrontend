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
    <form @submit.prevent="" class="flex flex-row space-x-2 text-orange-600">
      <strong>CONTACT US </strong>
      <a href="mailto:ifihadinvested12@gmail.com">
        <font-awesome-icon
          icon="fa-solid fa-envelope"
          class="h-5 hover:text-green-600"
        />
      </a>
      <a class="flex-1" href="https://wa.me/+254758287757">
        <font-awesome-icon
          icon="fa-brands fa-whatsapp"
          class="h-5 hover:text-green-600"
        />
      </a>
      <a href="https://twitter.com/riki_dev_">
        <font-awesome-icon
          icon="fa-brands fa-twitter"
          class="h-5 hover:text-green-600"
        />
      </a>
    </form>
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
