<template>
  <div class="info__bussiness--content company__section">
    <p class="font-semibold"><USkeleton class="h-4 w-[250px]" /></p>
    <ul class="text-sm">
      <li class="info__bussiness--details">
        <USkeleton class="h-4 w-[250px]" />
      </li>
      <li class="info__bussiness--details pt-2">
        <USkeleton class="h-4 w-[250px]" />
      </li>
      <li class="info__bussiness--details pt-2">
        <USkeleton class="h-4 w-[250px]" />
      </li>
      <li class="info__bussiness--details pt-2">
        <USkeleton class="h-4 w-[250px]" />
      </li>
      <li class="info__bussiness--details pt-2">
        <USkeleton class="h-4 w-[250px]" />
      </li>
      <li class="info__bussiness--details pt-2">
        <USkeleton class="h-4 w-[250px]" />
      </li>
      <li class="pt-2">
        <USkeleton class="h-4 w-[250px]" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({})
</script>

<style scoped>
.info__bussiness--content {
  @apply flex flex-col gap-4 p-4 w-full;
}
.info__bussiness--details {
  @apply pb-2;
}
.info__bussiness--icon {
  @apply text-primary;
}
.info__bussiness--description {
  @apply pl-2;
}
.info__bussiness--link {
  @apply pl-2 hover:text-primary dark:text-primary dark:hover:text-white text-green-800;
}
</style>
