<template>
  <div class="detail__content--card job__section">
    <div class="content--description">
      <div class="content--heading">
        <!-- DESC -->
        <p class="content--heading--title">
          <USkeleton class="h-4 w-[250px]" />
        </p>
      </div>
      <div class="content--information py-3 space-y-2">
        <USkeleton class="h-4 w-full" />
        <USkeleton class="h-4 w-full" />
        <USkeleton class="h-4 w-full" />
        <USkeleton class="h-4 w-[250px]" />

        <USkeleton class="h-4 w-full" />
        <USkeleton class="h-4 w-full" />
        <USkeleton class="h-4 w-full" />
        <USkeleton class="h-4 w-[250px]" />
      </div>
    </div>
    <div class="content--required">
      <div class="content--heading">
        <!-- REQUIREMENT -->
        <p class="content--heading--title">
          <USkeleton class="h-4 w-[250px]" />
        </p>
      </div>
      <div class="content--information py-3">
        <div class="information--text space-y-2">
          <USkeleton class="h-4 w-[400px]" />
          <USkeleton class="h-4 w-[400px]" />
          <USkeleton class="h-4 w-[400px]" />
        </div>
      </div>
    </div>
    <div class="content--contact">
      <div class="content--heading">
        <!-- CONTACT -->
        <p class="content--heading--title">
          <USkeleton class="h-4 w-[250px]" />
        </p>
      </div>
      <div class="content--information flex flex-col gap-2 p-2">
        <USkeleton class="h-4 w-[400px]" />
        <USkeleton class="h-4 w-[400px]" />
        <USkeleton class="h-4 w-[400px]" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({})
</script>
<style scoped>
.content--heading--title {
  @apply text-lg font-semibold pb-2;
}
.information--text {
  @apply text-sm leading-6 sm:px-3 dark:text-gray-300 text-gray-700 text-justify;
}
.value--icon {
  @apply my-auto text-lg text-primary;
}
.primaryline {
  @apply basis-2/5 border-b border-green-500;
}
.grayline {
  @apply basis-3/5 border-b;
}
</style>
