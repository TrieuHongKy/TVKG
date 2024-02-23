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
      colorMode,
      isDark
    }
  }
})
</script>

<template>
  <ClientOnly>
    <UButton
      :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
      color="gray"
      variant="ghost"
      aria-label="Theme"
      class="hover:text-primary dark:hover:text-primary"
      @click="isDark = !isDark"
    />

    <template #fallback>
      <div class="w-8 h-8" />
    </template>
  </ClientOnly>
</template>
