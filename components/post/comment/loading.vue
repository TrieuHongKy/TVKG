<template>
  <div>
    <div
      v-for="comment in 6"
      :key="comment"
      class="comment__section flex flex-row items-center gap-2 dark:bg-gray-700 dark:hover:bg-gray-600"
    >
      <div class="col-span-2 sm:col-span-1">
        <USkeleton class="h-12 w-12" :ui="{ rounded: 'rounded-full' }" />
      </div>
      <div class="basis-full flex flex-col gap-1">
        <div class="flex items-center gap-1 font-semibold text-green-600 hover:text-primary">
          <USkeleton class="h-4 w-1/2 md:w-[200px]" />
        </div>
        <p class="flex items-center gap-1 text-sm">
          <USkeleton class="h-4 w-full md:w-[400px]" />
        </p>
      </div>
      <div>
        <!-- <USkeleton class="h-8 w-8" :ui="{ rounded: 'rounded-full' }" /> -->
      </div>
    </div>
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
