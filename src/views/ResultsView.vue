<script lang="ts" setup>
document.title = "Results for Investments on my Stock - Eric Nyaga"
</script>

<template>
  <main class="text-lg flex flex-col py-20">
    <section class="self-center">
      <h1>How much money would you have made on <span class="text-green-900">AAPL?</span></h1>
      <p class="flex flex-col space-y-3">
        <span>If you had bought: <span class="text-green-900">1000$</span></span>
        <span>Into AAPL on <span class="text-green-900">2021-10-25</span></span>
        <span>You would have made: <span class="text-green-900">$147.43</span></span>
        <span>Your Annual Rate of Return would be: <span>14.74%</span></span>
        <span>Total Increase: <span class="text-green-900">14.74%</span></span>
        <span>With that much money you could have bought: <span class="text-green-900">0.0197 Mega-yatches.</span></span>
      </p>
      <p class="mt-10">
        Share your results:<br />
        <button class="hover:underline ml-10 p-1">Copy link</button>
      </p>
      <div class="mt-5 ml-20">
        <router-link to="/"
          ><button class="w-fit bg-green-900 p-2 rounded-lg">
            Try Again
          </button></router-link
        >
      </div>
    </section>
  </main>
</template>
