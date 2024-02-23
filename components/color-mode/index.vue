<template>
  <ClientOnly>
    <UToggle
      v-model="isDark"
      on-icon="i-heroicons-moon-20-solid"
      off-icon="i-heroicons-sun-20-solid"
      aria-label="Toggle dark mode"
    />
  </ClientOnly>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const colorMode = useColorMode()

    const isDark = computed({
      get() {
        return colorMode.value === 'dark'
      },
      set() {
        colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
      }
    })
    return {
      isDark
    }
  }
})
</script>

<style scoped></style>
