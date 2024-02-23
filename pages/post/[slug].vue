<template>
  <div>
    <div class="flex flex-col p-2 gap-6">
      <div class="flex flex-col sm:flex-row sm:px-16 gap-4">
        <div class="w-full flex flex-col post__section">
          <div class="flex flex-col p-4 gap-4">
            <div class="p-2">
              <post-detail-heading></post-detail-heading>
            </div>
            <div>
              <post-detail-content></post-detail-content>
            </div>
          </div>
        </div>
        <!--        <div class="w-full sm:w-[30%] flex flex-col">-->
        <!--          <div class="sticky top-20 post__section">-->
        <!--            &lt;!&ndash; PostDetails_Related &ndash;&gt;-->
        <!--            &lt;!&ndash; <post-related></post-related> &ndash;&gt;-->
        <!--          </div>-->
        <!--        </div>-->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'Post',
  setup() {
    useHead({
      title: 'Bài viết chi tiết',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content: 'User homepage website'
        }
      ]
    })
    // const { id } = useRoute().params
    const postStore = usePostStore()
    const { post } = storeToRefs(postStore)
    const { slug } = useRoute().params
    console.log('pp', post)

    onMounted(async () => {
      await postStore.getPostBySlug(slug as String)
    })

    return { post }
  }
})
</script>

<style scoped></style>
