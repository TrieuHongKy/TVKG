<template>
  <div>
    <div class="post__detail--related p-2">
      <p class="text-lg text-primary font-semibold">Bài viết liên quan</p>
    </div>
    <!-- <div v-for="post in relatedPosts" :key="post.id">
      <div class="post__detail--related mt-4 flex flex-col gap-4">
        <div class="detail--related--card flex flex-row gap-3">
          <div class="related--thumbnail w-[30%] overflow-hidden rounded-lg">
            <img class="w-full h-full" :src="post.image" alt="" />
          </div>
          <div class="related--thumbnail w-[30%] overflow-hidden rounded-lg">
        <img class="w-full h-full" src="{{ image }}" alt="" />
      </div>
          <div class="flex flex-col gap-2 related-title w-[70%] text-gray-600 dark:text-gray-300 text-sm text-justify">
            <nuxt-link :to="`/post/${post.id}`" class="hover:text-primary line-clamp-2">
              {{ post.postTitle }}</nuxt-link
            >
            <nuxt-link :to="`/post/${post.id}`" class="hover:text-primary">Xem thêm...</nuxt-link>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>
<script lang="ts">
export default defineComponent({
  props: {},
  setup(props) {
    return {}
  }
})
</script>
<style scoped></style>
