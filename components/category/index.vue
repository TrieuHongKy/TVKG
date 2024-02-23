<template>
  <div class="w-full category__section h-fit flex flex-col border-primary p-2">
    <p class="p-2 font-semibold text-xl dark:text-primary text-green-700">Danh Mục Nổi Bật</p>
    <div
      v-for="category in allCategory"
      :key="category.id"
      class="hover:border-primary [&:not(:last-child)]border-b px-2"
    >
      <nuxt-link :to="`/posts/category/${category?.slug}`" class="flex justify-between py-2 hover:text-primary">
        <p class="flex items-center gap-2"><UIcon name="i-heroicons-chevron-double-right" /> {{ category.name }}</p>
        <p>( {{ category.post_count }} )</p>
      </nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { Category } from '~/types/category'
// import type { Post } from '~/types/post'

export default defineComponent({
  setup() {
    const postStore = usePostStore()
    const { categories } = storeToRefs(postStore)
    const { getCategories } = postStore

    const allCategory = ref<Array<Category>>([])

    onMounted(async () => {
      await getCategories()
      allCategory.value = categories.value as any
    })

    return { allCategory }
  }
})
</script>

<style scoped></style>
