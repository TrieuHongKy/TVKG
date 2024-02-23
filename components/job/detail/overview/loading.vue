<template>
  <div>
    <div class="overview__jobDetail job__section">
      <div class="overview__jobDetail--item">
        <USkeleton class="h-4 w-[250px]" />
      </div>
      <div class="overview__jobDetail--item">
        <USkeleton class="h-4 w-[250px]" />
      </div>
      <div class="overview__jobDetail--item">
        <USkeleton class="h-4 w-[250px]" />
      </div>
      <div class="overview__jobDetail--item">
        <USkeleton class="h-4 w-[250px]" />
      </div>
      <div class="overview__jobDetail--item">
        <USkeleton class="h-4 w-[250px]" />
      </div>
      <div class="overview__jobDetail--item">
        <USkeleton class="h-4 w-[250px]" />
      </div>
      <div class="overview__jobDetail--item">
        <USkeleton class="h-4 w-[250px]" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({})
</script>

<style scoped>
.overview__jobDetail {
  @apply grid grid-cols-1 md:grid-cols-2 gap-2;
}
.overview__jobDetail--item {
  @apply flex flex-row items-center dark:text-gray-300 gap-2 text-sm;
}
.overview__jobDetail--title {
  @apply text-sm font-semibold dark:text-white;
}
.overview__jobDetail--icon {
  @apply text-xl;
}
.overview__jobDetail--link {
  @apply text-primary hover:text-green-600 dark:text-primary/80 dark:hover:text-primary;
}
</style>
