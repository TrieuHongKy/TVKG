<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="flex flex-col-reverse sm:flex-row gap-4">
    <div class="w-full sm:w-3/5 md:w-3/4">
      <template v-if="isLoadingPost">
        <post-loading></post-loading>
      </template>
      <template v-else>
        <lazy-company-posts :related="relatedPost" :posts="postsInCategory"></lazy-company-posts>
      </template>
    </div>
    <div class="w-full sm:w-2/5 md:w-1/4"><category></category></div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import type {Post} from '~/types/post'

export default defineComponent({
  setup() {
    const { slug } = useRoute().params
    const postStore = usePostStore()

    const { getCategory, getPostsByCategory } = postStore
    const { category, postsInCategory, isLoadingPost } = storeToRefs(postStore)

    const relatedPost = ref<Array<Post>>([])
    onMounted(async () => {
      await getCategory(slug as any)
      await getPostsByCategory(slug as any)
      relatedPost.value = postsInCategory.value as any
      console.log('xyz', relatedPost.value.length)
    })

    return { category, postsInCategory, isLoadingPost, relatedPost }
  }
})
</script>

<style scoped></style>
