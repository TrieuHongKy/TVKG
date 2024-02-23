<template>
  <div>
    <div class="profile__section">
      <div>
        <div class="profile__title--content">
          <div class="profile__title--header">
            <div class="text-lg">Giới thiệu bản thân</div>
          </div>
          <div v-if="isOwnerProfile" class="profile__title--action">
            <UIcon
              name="i-heroicons-pencil-square"
              class="profile__title--icon"
              @click="openTemplate(resume?.id, 'editTitle')"
            >
            </UIcon>
          </div>
        </div>
        <!-- <div v-if="tit.title == ''" class="font-semibold py-2">
          Tiêu Đề
          <p class="font-normal text-gray-500 pt-2 px-4">Tài khoản này chưa cập nhật mô tả của bản thân</p>
        </div> -->
      </div>
      <!-- <profile-salary :show-salary="salary" :public="public"></profile-salary> -->
      <div v-if="resume?.name && isOwnerProfile" class="mb-4 md:m-4 overflow-hidden">
        <p class="font-bold">
          {{ resume?.name }}
        </p>
        <span class="italic">
          {{ resume?.description }}
        </span>
      </div>
      <div v-if="!resume?.name && isOwnerProfile" class="profile__title--default">
        <p class="">Hãy mô tả về năng lực bản thân để dễ dàng hơn trong quá trình tìm việc</p>
        <u class="profile__title--add" @click="openTemplate(null, 'editTitle')">Mô tả bản thân</u>
      </div>
      <div v-if="!resume?.name && !isOwnerProfile">Không có thông tin nào để hiển thị.</div>
    </div>
    <UModal v-if="isOwnerProfile" v-model="openModal" prevent-close>
      <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center text-lg">
            <p v-if="nameModal === 'editTitle'">Chỉnh sửa tiêu đề</p>
          </div>
        </template>
        <UFormGroup>
          <div>
            <div v-if="nameModal === 'editTitle'" class="flex flex-col gap-4">
              <div class="flex flex-col gap-2">
                <div class="flex flex-col gap-4">
                  <span class="text-base">Tiêu đề của bạn</span>
                  <p class="text-sm font-light">Mô tả về kỹ năng/kinh nghiệm chuyên môn của bạn</p>
                  <UInput
                    v-model="title"
                    placeholder="Ví dụ: Chuyên gia thiết kế web có kinh nghiệm về Workpress"
                    size="lg"
                    help="Ví dụ: Chuyên gia thiết kế web có kinh nghiệm về Workpress"
                  />
                </div>
                <!-- <i v-if="titModel.error.value !== '' && titModel.title.value.length < 8" class="text-xs text-red-600">
                  {{ titModel.error }}
                </i> -->
              </div>
              <div class="flex flex-col gap-4">
                <span class="text-base">Mô tả của bạn</span>
                <p class="text-sm font-light">Mô tả về kỹ năng/kinh nghiệm chuyên môn của bạn</p>
                <ul class="flex flex-col text-sm font-light gap-2">
                  <span>• Mô tả điểm mạnh và kỹ năng của bạn</span>
                  <span>• Làm nổi bật các dự án, thành tựu và giáo dục</span>
                  <span>• Viết ngắn gọn và đảm bảo không có lỗi</span>
                </ul>
                <UTextarea
                  v-model="description"
                  size="lg"
                  placeholder="Ví dụ: Là một nhân viên thiết kế web có kinh nghiệm 6 năm, tôi đã thiết kế và phát triển nhiều trang web."
                />
              </div>
            </div>
          </div>
        </UFormGroup>
        <template #footer>
          <div class="flex gap-4 justify-end">
            <div class="SaveButton">
              <UButton
                v-if="nameModal === 'editTitle'"
                :ui="{ rounded: 'rounded-full' }"
                size="lg"
                color="primary"
                variant="outline"
                class="px-6"
                @click="nameModal === 'editTitle' ? saveTitle() : cancelTitle()"
                >{{ nameModal === 'editTitle' ? 'Lưu' : 'Hủy' }}</UButton
              >
            </div>
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { Resume } from '~/types/profile'

export default defineComponent({
  props: {
    resumeData: {
      type: Object,
      default: () => ({}) as Resume
    },
    isOwnerProfile: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update-resume'],
  setup(props, { emit }) {
    const { resumeData } = props
    const resumeStore = useResumeStore()
    const { setResume, getResumeById, createResume, updateResume } = resumeStore
    const { resume } = storeToRefs(resumeStore)

    // const resume = ref<Resume | null>(null)
    const title = ref()
    const description = ref()

    onMounted(async () => {
      await setResume(resumeData as Resume)
      console.log('resumeee: ', resumeData)

      if (resume.value?.name && resume.value?.description) {
        title.value = resume.value?.name
        description.value = resume.value?.description
      }
      console.log('title.value', resume.value?.name)
    })

    const saveTitle = async () => {
      const resumeData = {
        name: title.value,
        description: description.value
      }
      if (resume.value?.id) {
        await updateResume(Number(resume.value?.id), resumeData as any)
      } else {
        await createResume(resumeData as any)
        emit('update-resume', resume.value)
      }
      openModal.value = false
    }
    const cancelTitle = () => {
      title.value = resume.value?.name
      description.value = resume.value?.description
      openModal.value = false
    }
    const openModal = ref(false)
    const nameModal = ref('')

    const openTemplate = async (id: any, modal: string) => {
      nameModal.value = modal
      openModal.value = true
      await getResumeById(id)
    }
    return {
      resume,
      title,
      description,
      saveTitle,
      cancelTitle,
      openModal,
      nameModal,
      openTemplate
    }
  }
})
</script>

<style scoped>
.profile__title {
  @apply p-4 bg-card dark:bg-card-dark rounded-lg;
}
.profile__title--content {
  @apply flex justify-between pb-0 md:pb-2;
}
.profile__title--header {
  @apply font-semibold text-lg;
}
.profile__title--icon {
  @apply w-5 h-5 text-center rounded-full border-primary border text-primary cursor-pointer;
}
.profile__title--action {
  @apply flex items-center justify-center font-bold gap-3;
}
.profile__title--default {
  @apply flex flex-col md:flex-row gap-2 px-4 py-2 md:items-center;
}
.profile__title--add {
  @apply text-sm text-green-600 hover:text-primary dark:hover:text-primary cursor-pointer;
}
</style>
