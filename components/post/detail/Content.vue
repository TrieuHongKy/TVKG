<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="post__detail--content md:px-2 flex flex-col gap-6">
    <div class="post__detail--image flex items-center justify-center rounded-lg overflow-hidden">
      <img class="w-4/5 object-cover" :src="post?.image" alt="" />
    </div>
    <!-- <div class="post__detail--text py-2 text-justify text-base dark:text-gray-300">{{ postContent }}</div> -->
    <div class="text-xl tracking-wider" v-html="post?.content"></div>
  </div>
</template>
<script lang="ts">
export default defineComponent({
  setup(props) {
    const postStore = usePostStore()
    const { post } = storeToRefs(postStore)
    return {
      post
    }
  }
})
</script>
<style scoped></style>
