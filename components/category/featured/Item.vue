<template>
  <nuxt-link v-for="cate in featured" :key="cate.id" to="#" class="category__featured--content">
    <div class="category__featured--detail">
      <img class="category__featured--image" :src="'/categories/' + cate.image" :alt="cate.title" />
      <span class="category__featured--title">{{ cate.title }}</span>
      <p class="category__featured--quantity">{{ cate.quantity }} việc làm</p>
    </div>
  </nuxt-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { featured } from '~/apis/mock-data/category/featured'

export default defineComponent({
  name: 'Featured',
  setup() {
    return {
      featured
    }
  }
})
</script>

<style scoped>
.category__featured--content {
  @apply w-full col-span-1 p-4 rounded-xl bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 border-2 hover:border-primary hover:bg-theme-light duration-200;
}
.category__featured--detail {
  @apply flex flex-col items-center gap-2 md:gap-4 dark:text-tertiary-light;
}
.category__featured--title {
  @apply font-medium text-lg;
}
.category__featured--image {
  @apply h-[80px] md:h-[120px] w-[80px] md:w-[120px];
}
.category__featured--quantity {
  @apply text-primary dark:text-green-400;
}
</style>
