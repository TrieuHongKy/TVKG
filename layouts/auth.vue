<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({})
</script>

<template>
  <div class="h-screen overflow-auto no-scrollbar">
    <nuxt-loading-bar :duration="1000" />
    <header class="flex items-center justify-between w-full h-[10%] mt-4">
      <header-logo></header-logo>
      <color-mode></color-mode>
    </header>
    <div class="h-4/5 p-8">
      <slot />
    </div>
  </div>
</template>

<style scoped></style>
