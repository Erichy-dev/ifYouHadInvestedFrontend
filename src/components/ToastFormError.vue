<script lang="ts" setup>
defineProps<{
  formInvalid: boolean;
  formError: string;
  textSize?: string | "text-lg";
}>();
</script>

<template>
  <main :class="textSize">
    <transition name="toast-form" appear>
      <p class="absolute text-red-700 font-serif" v-if="formInvalid">
        {{ formError }}
      </p>
    </transition>
  </main>
</template>

<style>
.toast-form-leave-active,
.toast-form-enter-active {
  transition: all 3s ease-in-out;
}
.toast-form-leave-to,
.toast-form-enter-from {
  opacity: 0;
  transform: translateY(50px);
}
</style>
