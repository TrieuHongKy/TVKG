<script setup lang="ts">
// eslint-disable-next-line vue/require-prop-types
const { goBack, goNext, showFooter } = defineProps(['goBack', 'goNext', 'showFooter'])
</script>
<template>
  <header></header>
  <main class="overflow-y-auto h-[calc(80vh-2rem)]">
    <slot></slot>
  </main>
  <footer v-if="showFooter">
    <div class="fixed bottom-0 left-0 w-full bg-white dark:bg-theme-dark">
      <div class="sticky bottom-0 h-1 bg-[#f2f7f2] mt-5"></div>
      <div class="flex justify-between py-2 px-6 mx-auto">
        <div class="order-first">
          <UButton
            :ui="{ rounded: 'rounded-full' }"
            size="lg"
            class="px-6"
            color="primary"
            variant="outline"
            @click="goBack"
          >
            Quay lại
          </UButton>
        </div>
        <div class="order-last">
          <UButton
            :ui="{ rounded: 'rounded-full' }"
            size="lg"
            class="px-6"
            color="primary"
            variant="solid"
            @click="goNext"
          >
            Tiếp theo
          </UButton>
        </div>
      </div>
    </div>
  </footer>
</template>
<style scoped>
/* main {
  overflow-y: auto;
  height: calc(70vh - 2rem);
} */
</style>
