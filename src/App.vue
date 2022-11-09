<script setup lang="ts">
import { RouterView } from "vue-router";
import axios from "axios";
import NavBar from "@/components/NavBar.vue";
import BodyFooter from "./components/BodyFooter.vue";

axios.defaults.baseURL = "https://ifihadinvested.pythonanywhere.com/";
// axios.defaults.baseURL = "http://127.0.0.1:8000/";
</script>

<template>
  <main
    class="min-h-screen overflow-x-clip leading-loose flex flex-col bg-black text-white"
  >
    <NavBar />
    <RouterView class="min-h-screen font-bold" />
    <BodyFooter />
  </main>
</template>

<style>
.toast-move,
.toast-enter-active {
  transition: all 3s ease-in-out;
}
.toast-leave-active {
  position: absolute;
}
.toast-enter-from {
  opacity: 0;
  transform: translateX(50px);
}
</style>
