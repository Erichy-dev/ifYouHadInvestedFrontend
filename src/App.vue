<script setup lang="ts">
import { RouterView } from "vue-router";
import axios from "axios";
import NavBar from "@/components/NavBar.vue";
import BodyFooter from "./components/BodyFooter.vue";
import { useCounterStore } from "./stores/counter";

axios.defaults.baseURL = "https://ifihadinvested.pythonanywhere.com/";
// axios.defaults.baseURL = "http://127.0.0.1:8000/";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

axios({
  method: "post",
  url: "",
})
  .then((res) => {
    if (res.data !== "None") {
      useCounterStore().userName = res.data;
      useCounterStore().signedIn = true;
    }
  })
  .catch((err) => {
    // console.log("me");
  });
</script>

<template>
  <main
    class="min-h-screen overflow-x-clip leading-loose flex flex-col bg-[url('/media/bg.jpg')] text-white"
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
