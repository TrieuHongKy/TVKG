<template>
  <div v-for="comment in comments as Array<Comment>" :key="comment?.user?.id">
    <div
      v-if="comment.id"
      class="comment__section flex flex-row items-center gap-2 dark:bg-gray-700 dark:hover:bg-gray-600"
    >
      <nuxt-link
        :to="
          comment?.parent?.user?.user_type === 'company'
            ? '/company/' + comment?.parent?.user?.id
            : '/profile/' + comment?.parent?.user?.id
        "
        class="col-span-2 sm:col-span-1"
      >
        <UAvatar :src="comment?.user?.image" :alt="comment?.user?.name" size="xl" />
      </nuxt-link>
      <div class="basis-full flex flex-col gap-1">
        <div class="flex items-center gap-1 font-semibold text-green-600 hover:text-primary">
          {{ comment?.user?.name }}
        </div>
        <div class="flex items-center gap-1 text-sm">
          <p>
            <nuxt-link
              v-if="comment?.parent"
              :to="
                comment?.parent?.user?.user_type === 'company'
                  ? '/company/' + comment?.parent?.user?.id
                  : '/profile/' + comment?.parent?.user?.id
              "
              class="text-primary"
            >
              @{{ comment?.parent?.user?.name }}
            </nuxt-link>
            {{ comment?.comment }}
          </p>
        </div>
      </div>
      <div class="flex gap-4">
        <div>
          <UTooltip :text="'Phản hồi bình luận của ' + comment?.user?.name" :popper="{ arrow: true }">
            <UIcon
              class="flex rotate-180 cursor-pointer text-lg items-center hover:text-primary"
              name="i-heroicons-arrow-uturn-right"
              @click="replyComment(comment)"
            />
          </UTooltip>
        </div>
        <div v-if="user?.id === comment?.user?.id">
          <UTooltip text="Xóa bình luận" :popper="{ arrow: true }">
            <UIcon
              class="flex cursor-pointer text-lg items-center hover:text-red-500"
              name="i-heroicons-trash"
              @click="openTemplate(comment?.id)"
            />
          </UTooltip>
          <UModal
            v-model="openModal"
            :ui="{
              shadow: 'dark:shadow-none',
              overlay: { background: 'bg-gray-200/10 dark:bg-gray-800/10' },
              transition: { enter: 'ease-out duration-150', leave: 'ease-in duration-150' }
            }"
          >
            <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
              <template #header>
                <p class="font-semibold line-clamp-1">Xóa bình luận</p>
              </template>

              <p>
                Bạn có thật sự muốn xóa bình luận <b class="">{{ comment.comment }} </b> hay không?
              </p>

              <template #footer>
                <div class="flex gap-4 justify-end">
                  <div class="CancelButton">
                    <UButton
                      :ui="{ rounded: 'rounded-full' }"
                      size="lg"
                      color="primary"
                      variant="outline"
                      class="px-6"
                      @click="openModal = false"
                      >Hủy</UButton
                    >
                  </div>
                  <div class="DeletaButton">
                    <UButton
                      type="submit"
                      :ui="{ rounded: 'rounded-full' }"
                      size="lg"
                      color="primary"
                      variant="solid"
                      class="px-6"
                      @click="deleteComment(comment?.id)"
                      >Xóa
                    </UButton>
                  </div>
                </div>
              </template>
            </UCard>
          </UModal>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { Comment } from '~/types/comment'

export default defineComponent({
  props: {
    comments: {
      type: Array<Comment>,
      default: null
    }
  },
  emits: ['deleteComment', 'replyComment'],
  setup(props, { emit }) {
    const openModal = ref(false)
    console.log('blabla', props.comments)

    const openTemplate = async (comment_id: any) => {
      openModal.value = true
    }

    // const commentsWithoutParent = props.comments.filter((comment) => comment.parent === null)
    // const specificComment = props.comments.filter((comment) => comment.parent !== null)
    // console.log(specificComment)

    const authStore = useAuthStore()
    const { user } = storeToRefs(authStore)

    const deleteComment = (commentId: number) => {
      emit('deleteComment', commentId)
      openModal.value = false
      console.log(commentId)
    }

    const replyComment = (comment: Comment) => {
      emit('replyComment', comment)
    }

    return {
      openModal,
      //  commentsWithoutParent,
      //   specificComment,
      user,
      deleteComment,
      replyComment,
      openTemplate
    }
  }
})
</script>

<style scoped></style>
