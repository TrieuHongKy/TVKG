<!-- eslint-disable vue/no-v-html -->
<template>
  <div v-if="posts?.length > 0" class="flex flex-col gap-4">
    <div v-for="post in posts as any" :key="post.id" class="flex flex-col gap-2 comment__section">
      <div class="flex gap-4">
        <div class="flex justify-center items-center w-1/3 sm:w-1/4">
          <img :src="post?.user?.image" class="w-auto object-cover max-h-[80px]" />
        </div>
        <div class="flex flex-col gap-2 pt-2">
          <p class="hover:text-green-700 dark:hover:text-primary text-xl font-semibold">{{ post?.user?.name }}</p>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            Đăng ngày:
            {{
              new Date(post?.published_at + '').toLocaleDateString('vi-VN', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
              })
            }}
          </p>
        </div>
      </div>
      <div class="flex flex-col gap-2 py-2 font-light md:gap-2">
        <nuxt-link
          :to="`/post/${post?.slug}`"
          class="line-clamp-2 text-lg font-semibold text-green-600 hover:text-primary dark:text-primary dark:hover:text-green-500"
          >{{ post?.title }}</nuxt-link
        >
        <div
          v-if="!showFullContent && post?.content.length > 200"
          class="text-sm"
          v-html="post?.content.slice(0, 500) + '...'"
        ></div>
        <div v-else class="text-sm" v-html="post?.content"></div>
      </div>
      <nuxt-link :to="`/post/${post?.slug}`" class="text-sm hover:text-primary cursour-pointer text-green-600"
        >Xem thêm...</nuxt-link
      >
      <div v-if="post?.image" class="flex items-center justify-center">
        <img :src="post?.image" :alt="post?.title" class="rounded-md max-h-[50vh] object-cover" />
      </div>
      <div class="flex flex-col gap-1 pb-2">
        <div class="flex justify-between pt-2">
          <p v-if="post.likes" class="flex items-center gap-1 text-xs hover:underline cursor-pointer">
            {{ post.likes }}
            <span class="">Lượt thích</span>
          </p>
          <p v-else class="flex items-center text-xs hover:underline cursor-pointer">
            <span class="">Chưa có lượt thích</span>
          </p>
          <div class="flex gap-4">
            <p class="flex items-center gap-1 text-xs hover:underline cursor-pointer">
              {{ post.comments }}
              <span class="">Bình Luận</span>
            </p>
          </div>
        </div>
      </div>
      <div class="flex flex-row gap-2 border-t pt-2 border-primary">
        <div class="w-1/2">
          <div
            v-if="!post.isLiked"
            class="flex items-center justify-center gap-1 hover:bg-primary-100 py-2 rounded-xl dark:hover:bg-primary dark:hover:text-secondary cursor-pointer"
            @click="toggleLike(post.id)"
          >
            <UIcon name="i-heroicons-hand-thumb-up" class="info__bussiness--icon" />
            <span class="text-sm">Thích</span>
          </div>
          <div
            v-else
            class="flex justify-center items-center gap-1 hover:bg-primary-100 text-primary px-4 py-2 rounded-xl dark:hover:bg-primary dark:hover:text-secondary cursor-pointer"
            @click="toggleLike(post.id)"
          >
            <UIcon name="i-heroicons-hand-thumb-up-solid" class="" />

            <span class="text-sm">Đã thích</span>
          </div>
          <!-- <div v-else @click="toggleLike(post.id)">aaaaa</div> -->
        </div>
        <div
          class="flex w-1/2 items-center justify-center gap-1 hover:bg-primary-100 py-2 rounded-xl dark:hover:bg-primary dark:hover:text-secondary cursor-pointer"
          @click="openTemplate(post.id)"
        >
          <UIcon name="i-heroicons-chat-bubble-left-ellipsis" class="info__bussiness--icon" />
          <span class="text-sm">Bình Luận</span>
        </div>
        <!-- <div
          class="flex w-1/3 items-center justify-center gap-1 hover:bg-primary-100 py-2 rounded-xl dark:hover:bg-primary dark:hover:text-secondary cursor-pointer"
        >
          <UIcon name="i-heroicons-paper-airplane" class="info__bussiness--icon" />
          <span class="text-sm">Chia Sẻ</span>
        </div> -->
      </div>
      <UModal
        v-model="openModal"
        :ui="{
          shadow: 'dark:shadow-none',
          overlay: { background: 'bg-gray-200/10 dark:bg-gray-800/10' },
          transition: { enter: 'ease-out duration-150', leave: 'ease-in duration-150' },
          height: 'h-[90vh]',
          width: 'w-full md:max-w-[60vw]'
        }"
        prevent-close
      >
        <div class="h-full flex flex-col gap-4 p-6">
          <div class="comment__header flex items-center basis-[10%]">
            <p class="w-11/12 font-semibold line-clamp-1 text-primary-700 dark:text-primary-500">
              {{ post.title }}
            </p>
            <div class="w-1/12 flex justify-center pt-1 text-2xl cursor-pointer" @click="openModal = false">
              <UIcon name="i-heroicons-x-mark" />
            </div>
          </div>
          <!-- </template> -->
          <div
            v-if="commentData.length > 0"
            class="comment__body flex flex-col basis-full gap-2 overflow-auto no-scrollbar"
          >
            <template v-if="isLoadingComment">
              <post-comment-loading></post-comment-loading>
            </template>
            <template v-else>
              <lazy-post-comment
                :comments="commentData"
                @reply-comment="replyComment"
                @delete-comment="removeComment"
              ></lazy-post-comment>
            </template>
            <!-- </nuxt-link> -->
          </div>
          <div
            v-else
            class="comment__body flex flex-col justify-center items-center basis-full gap-2 overflow-auto no-scrollbar"
          >
            <p class="text-lg text-gray-600 dark:text-gray-400">
              Bài viết này chưa có bình luận nào, hãy là người bình luận đầu tiên
            </p>
          </div>

          <!-- <template #footer> -->
          <div v-if="parentComment" class="flex justify-between items-center px-2">
            <span
              >Phản hồi bình luận của <b>{{ parentComment?.user?.name }}</b></span
            >
            <UButton class="cursor-pointer" color="gray" @click="parentComment = null">Hủy</UButton>
          </div>

          <div class="comment__footer flex items-center basis-[10%]">
            <form class="flex gap-2 w-full items-center" @submit.prevent="addComment()">
              <UInput v-model="comment" class="basis-full" size="xl" placeholder="Viết bình luận..."></UInput>
              <UButton icon="i-heroicons-paper-airplane" size="xl" class="px-4" type="submit"></UButton>
            </form>
          </div>
        </div>
      </UModal>
    </div>
  </div>
  <div v-else class="flex justify-center w-full pt-2">
    <p class="text-gray-500 text-xl">Doanh nghiệp này hiện chưa có bài viết nào được đăng tải</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { Post } from '~/types/post'
import type { Comment } from '~/types/comment'

export default defineComponent({
  props: {
    posts: {
      type: Array,
      default: null
    },
    // company: {
    //   type: Object,
    //   default: null,
    //   required: true
    // },
    related: {
      type: Array,
      default: null
    }
  },
  setup(props, { emit }) {
    const authStore = useAuthStore()
    const companyStore = useCompanyStore()
    const postStore = usePostStore()

    const { comments, isLoadingComment, parentComment } = storeToRefs(postStore)
    const { toggleLikeByPost, checkLikePost, getCommentByPost, createComment, removeComment, getCommentByParent } =
      postStore

    const { user } = storeToRefs(authStore)
    const user_id = user.value?.id

    const showFullContent = ref(false)

    const postId = ref<Number>(0)
    const commentId = ref<Number>(0)
    const comment = ref('')
    const commentData = ref<Array<Comment>>([])
    const commentByParent = ref<Array<Comment>>([])

    const openModal = ref(false)
    const nameModal = ref('')

    const showedComment = computed(() => {
      if (comments.value.length > 0) {
        return comments.value
      }
    })

    onMounted(async () => {
      await companyStore.getPostsAndCheckLike(user_id as any)
    })

    const openTemplate = async (post_id: any) => {
      openModal.value = true
      nameModal.value = 'commentModal'
      await getCommentByPost(post_id)
      postId.value = post_id
      commentData.value = comments.value as any
    }

    const addComment = async () => {
      await createComment({
        parent_id: parentComment.value?.id || null,
        user_id: user_id,
        post_id: postId.value,
        comment: comment.value
      } as any)
      comment.value = ''
      parentComment.value = null
    }

    const replyComment = async (cmt: Comment) => {
      comment.value = ''
      parentComment.value = cmt
    }

    const currPost = async (post: Post) => {
      await postStore.setPost(post)
    }

    const toggleLike = async (post_id: any) => {
      await toggleLikeByPost(user_id, post_id)
      const post = props.posts.find((post: any) => post.id === post_id)
      if (post.id === post_id) {
        post.isLiked = !post.isLiked
        post.likes = post.isLiked ? post.likes + 1 : post.likes - 1
      }
    }

    return {
      openModal,
      nameModal,
      showFullContent,
      user_id,
      commentId,
      comment,
      comments,
      commentByParent,
      parentComment,
      isLoadingComment,
      commentData,
      showedComment,
      addComment,
      removeComment,
      replyComment,
      getCommentByParent,
      openTemplate,
      toggleLike,
      checkLikePost,
      // checkLike,
      getCommentByPost,
      currPost
      // postsByCompany
    }
  }
})
</script>

<style scoped></style>
