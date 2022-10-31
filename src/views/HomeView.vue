<script setup lang="ts">
import { ref, type Ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const navigator = useRouter();
function showResults() {
  navigator.push("/results");
}
const date = ref(new Date().toISOString().substring(0, 10));

const stockList: Ref<string[][]> = ref([]);
// axios({
//   method: "get",
//   url: "stocksList",
// }).then((res) => {
//   stockList.value = res.data.stocks
// })
</script>

<template>
  <main class="self-center w-6/12">
    <section class="flex flex-col place-items-center">
      <h1 class="text-xl md:text-4xl lg:text-5xl my-5">
        IF I HAD INVESTED
      </h1>
      <form class="md:w-5/12 flex flex-col space-y-1" @submit.prevent="showResults">
        <label for="amount">
          <font-awesome-icon
            icon="fa-solid fa-dollar-sign"
            class="h-5"
          />
        </label>
        <input
          class="border rounded-md p-1 border-black text-black"
          id="amount"
          name="amount"
          type="number"
          required
          placeholder="Amount"
        />
        <label for="stock">in</label>
        <select 
          class="border rounded-md p-1 border-black text-black" 
          required 
          id="stock" 
          name="stock"
        >
          <option
            v-for="stock in stockList" 
            :key="stock[0]" 
            :value="stock"
          >
            <span v-if="stock[0] == 'symbol'"></span>
            <span v-else>{{ stock[1] }}</span>
          </option>
        </select>
        <label for="dateOfStock">On</label>
        <input
          class="border rounded-lg p-1 border-black text-black"
          required
          id="dateOfStock"
          name="dateOfStock"
          type="date"
          :value="date"
        />
        <button class="bg-green-900 rounded-lg py-2 border-black" type="submit">
          <font-awesome-icon
            icon="fa-solid fa-dollar-sign"
            class="h-4"
          />ubmit
        </button>
      </form>
    </section>
    <div>
      <p class="text-lg">
        Want to know how many mega-yatchs you'd have bought if you had just HODL
        stocks?<br />
        YES!... MEGA
        <font-awesome-icon
          icon="fa-solid fa-ship"
          class="text-cyan-900 h-7"
        />YATCHS!
      </p>
      <button class="w-fit p-1 hover:underline mt-5">Copy link</button>
    </div>
  </main>
</template>
