<script setup lang="ts">
import { RouterView } from "vue-router";
import axios from "axios";
import NavBar from "@/components/NavBar.vue";

axios.defaults.baseURL = "http://127.0.0.1:8000/";
</script>

<template>
  <main
    class="min-h-screen overflow-x-clip leading-loose flex flex-col bg-black text-white"
  >
    <NavBar />
    <RouterView class="min-h-screen font-bold" />
  </main>
</template>

<style></style>
