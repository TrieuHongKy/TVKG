<template>
  <div class="category__featured">
    <div class="w-full">
      <span class="category__featured--heading">Top ngành nghề nổi bật</span>
      <p class="text-gray-500 pt-2">
        Bạn muốn tìm việc mới? Xem danh sách
        <nuxt-link to="category/JobList"><u class="category__featured--link">tại đây</u></nuxt-link>
      </p>
    </div>
    <div class="category__featured--list">
      <category-featured-item></category-featured-item>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FeaturedSection'
})
</script>

<style scoped>
.category__featured {
  @apply flex flex-col w-full md:p-2 gap-2;
}
.category__featured--list {
  @apply grid grid-cols-2 md:grid-cols-4 gap-4;
}
.category__featured--heading {
  @apply text-3xl text-primary font-semibold;
}
.category__featured--link {
  @apply text-sm md:text-base hover:text-primary dark:text-tertiary-light font-medium text-tertiary-dark dark:hover:text-primary;
}
</style>
