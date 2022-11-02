<script lang="ts" setup>
const props = defineProps<{
  stockList: string[][];
}>();
</script>

<template>
  <main>
    <option
    v-for="stock in stockList"
    :key="stock[0]"
    :value="stock[0]"
  >
    <span v-if="stock[1] == ''">{{ stock[0] }}</span>
    <span v-if="stock[0] == 'symbol'"></span>
    <span v-else>{{ stock[1] }}</span>
  </option>
  </main>
</template>