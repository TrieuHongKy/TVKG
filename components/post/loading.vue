<template>
  <div class="flex flex-col gap-4">
    <div v-for="(i, index) in 5" :key="index" class="flex flex-col gap-2 comment__section">
      <div class="flex gap-4">
        <div class="flex justify-center items-center w-1/3 sm:w-1/4">
          <USkeleton class="h-16 w-[80px]" />
        </div>
        <div class="w-full flex flex-col gap-2 pt-2">
          <USkeleton class="h-6 w-5/6" />
          <USkeleton class="h-4 w-2/3" />
        </div>
      </div>
      <div class="flex flex-col gap-4 py-2 font-light md:gap-2">
        <USkeleton class="h-6 w-2/3" />

        <USkeleton class="h-24 w-full" />
      </div>
      <USkeleton class="h-4 w-[150px]" />
      <div class="flex items-center justify-center">
        <USkeleton class="h-60 w-11/12" />
      </div>

      <USkeleton class="h-1 mt-4 w-full" />

      <div class="flex flex-row gap-2 pt-2">
        <div class="w-1/3">
          <div class="flex items-center justify-center gap-1 py-2 rounded-xl cursor-pointer">
            <USkeleton class="h-10 w-[200px]" />
          </div>
        </div>
        <div class="flex w-1/3 items-center justify-center gap-1 py-2 rounded-xl cursor-pointer">
          <USkeleton class="h-10 w-[200px]" />
        </div>
        <div class="flex w-1/3 items-center justify-center gap-1 py-2 rounded-xl cursor-pointer">
          <USkeleton class="h-10 w-[200px]" />
        </div>
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
