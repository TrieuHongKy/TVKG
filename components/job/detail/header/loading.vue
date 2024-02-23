<template>
  <div class="job-detail-heading job__section">
    <div class="company-information flex flex-col sm:flex-row items-center gap-4 sm:gap-8 p-4 relative">
      <div class="logo">
        <USkeleton class="h-[150px] w-[200px]" />
      </div>
      <div class="content flex flex-col items-center sm:items-start z-10">
        <div class="flex flex-col">
          <div class="job-name text-center sm:text-left text-lg font-bold py-2 text-primary">
            <USkeleton class="h-4 w-[400px]" />
          </div>
          <div class="company-name text-center sm:text-left text-lg font-bold py-2 hover:text-primary">
            <USkeleton class="h-4 w-[450px]" />
          </div>
          <div class="company-address text-center sm:text-left text-gray-500 dark:text-gray-400">
            <USkeleton class="h-4 w-[400px]" />
          </div>
          <div class="company-other flex flex-col text-center sm:text-left sm:flex-row gap-4 py-2">
            <USkeleton class="h-4 w-[200px]" />
            <USkeleton class="h-4 w-[200px]" />
          </div>
        </div>
        <div class="company-system flex py-2 gap-2">
          <USkeleton class="h-8 w-[120px] rounded-full" />
          <USkeleton class="h-8 w-[120px] rounded-full" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({})
</script>

<style scoped></style>
