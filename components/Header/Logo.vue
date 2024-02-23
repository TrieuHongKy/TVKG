<template>
  <div class="logo h-[var(--h-logo-mobile)] md:h-[var(--h-logo-desktop)] max-w-[125px] overflow-hidden">
    <nuxt-link to="/">
      <img src="~/assets/images/logo.png" class="w-full h-full object-cover dark:hidden" alt="logo" />
      <img src="~/assets/images/dark-logo.png" class="w-full h-full object-cover dark:inline-block" alt="logo" />
    </nuxt-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  }
})
</script>

<style scoped></style>
