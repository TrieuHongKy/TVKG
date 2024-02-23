<template>
  <div>
    <div
      v-for="(chat, index) in 8"
      :key="index"
      class="px-0 md:px-3 my-2 md:my-0 flex items-center justify-center md:justify-start hover:bg-grey-light cursor-pointer"
    >
      <USkeleton class="h-12 w-12" :ui="{ rounded: 'rounded-full' }" />
      <div class="hidden md:block ml-4 flex-auto md:flex-1 py-2">
        <div class="space-y-2">
          <USkeleton class="h-4 w-[250px]" />
          <div class="flex justify-between items-center">
            <USkeleton class="h-4 w-[200px]" />
            <USkeleton class="h-4 w-[40px]" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts"></script>

<style scoped></style>
