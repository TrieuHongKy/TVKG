<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div v-if="!public || otherExperience.experiences.length !== 0">
    <div class="profile__experience">
      <div class="profile__experience--header">
        <div class="profile__experience--heading">Kinh nghiệm khác</div>
        <div class="profile__experience--action">
          <UIcon
            v-if="!public"
            name="i-heroicons-plus-circle"
            class="profile__experience--icon"
            @click="openTemplate('addOtherExperience')"
          ></UIcon>
        </div>
      </div>
      <div v-if="otherExperience.experiences.length > 0" class="p-2">
        <div v-for="orther in otherExperience.experiences" :key="orther.id" class="profile__experience--content">
          <div class="mt-4 w-full">
            <div class="profile__experience--header">
              <span class="font-semibold dark:text-primary">
                {{ orther.name }}
              </span>
              <div v-if="!public" class="profile__experience--action">
                <UIcon
                  name="i-heroicons-pencil-square"
                  class="profile__experience--icon"
                  @click="openTemplate('editOtherExperience')"
                ></UIcon>
                <UIcon
                  name="i-heroicons-trash"
                  class="profile__experience--icon"
                  @click="openTemplate('deleteOtherExperience')"
                ></UIcon>
              </div>
            </div>
            <p class="mt-2">
              {{ orther.description }}
            </p>
          </div>
        </div>
      </div>
      <div v-if="otherExperience.experiences.length == 0" class="text-center">
        <div class="flex justify-center items-center mb-4">
          <img class="mx-auto w-40" src="~/assets/images/profile/OtherExperience.png" />
        </div>
        <div class="text-center mb-4">
          <p class="mb-4">
            Làm nổi bật những trải nghiệm có liên quan có thể tăng khả năng hiển thị của bạn trong kết quả tìm kiếm của
            chúng tôi (+5%)
          </p>
          <p class="profile__experience--default" @click="openTemplate('addOtherExperience')">
            Bổ sung các kinh nghiệm khác của bạn
          </p>
        </div>
      </div>
    </div>
    <UModal v-model="openModal" prevent-close>
      <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center text-lg">
            <p v-if="nameModal === 'addOtherExperience'">Thêm kinh nghiệm khác</p>
            <p v-if="nameModal === 'editOtherExperience'">Chỉnh sửa kinh nghiệm khác</p>
            <p v-if="nameModal === 'deleteOtherExperience'">Xóa kinh nghiệm khác</p>
          </div>
        </template>
        <UFormGroup>
          <div>
            <div v-if="nameModal === 'addOtherExperience'" class="flex flex-col gap-4">
              <div class="flex flex-col gap-2">
                <span class="text-base">Tiêu đề kinh nghiệm</span>
                <UInput v-model="experience.title" size="lg" placeholder="Ví dụ: Phát triển ứng dụng Android." />
              </div>
              <div class="flex flex-col gap-2">
                <span class="text-base">Mô tả kinh nghiệm</span>
                <UTextarea
                  v-model="experience.description"
                  size="lg"
                  placeholder="Ví dụ: Tôi là nhà phát triển ứng dụng Android, tôi có thể phát triển ứng dụng Android trong firebase."
                />
              </div>
              <i v-if="experience.error.value !== ''" class="text-xs text-red-600">{{ experience.error }}</i>
            </div>
            <div v-if="nameModal === 'editOtherExperience'" class="flex flex-col gap-4">
              <div class="flex flex-col gap-2">
                <span class="text-base">Tiêu đề kinh nghiệm</span>
                <UInput v-model="experience.title" size="lg" placeholder="Ví dụ: Phát triển ứng dụng Android." />
              </div>
              <div class="flex flex-col gap-2">
                <span class="text-base">Mô tả kinh nghiệm</span>
                <UTextarea
                  v-model="experience.description"
                  size="lg"
                  placeholder="Ví dụ: Tôi là nhà phát triển ứng dụng Android, tôi có thể phát triển ứng dụng Android trong firebase."
                />
              </div>
            </div>
            <div v-if="nameModal === 'deleteOtherExperience'" class="flex flex-col gap-4">
              <div class="text-base font-light">
                <p class="pb-2">
                  Thao tác này sẽ xóa
                  <span class="text-base font-semibold">"Kinh nghiệm thiết kế UX/UI website"</span> ra khỏi tất cả hồ sơ
                  của bạn.
                </p>
                <p>Bạn có chắc chắn muốn xóa "Kinh nghiệm thiết kế UX/UI website" không?</p>
              </div>
            </div>
          </div>
        </UFormGroup>
        <template #footer>
          <div class="flex gap-4 justify-end">
            <div class="CancelButton">
              <UButton
                :ui="{ rounded: 'rounded-full' }"
                size="lg"
                color="primary"
                variant="solid"
                class="px-6"
                @click="cancelExperience()"
                >Hủy</UButton
              >
            </div>
            <div v-if="nameModal === 'deleteOtherExperience'" class="DeletaButton">
              <UButton
                :ui="{ rounded: 'rounded-full' }"
                size="lg"
                color="primary"
                variant="outline"
                class="px-6"
                @click="openModal = false"
              >
                Xóa
              </UButton>
            </div>
            <div v-else class="SaveButton">
              <UButton
                :ui="{ rounded: 'rounded-full' }"
                size="lg"
                color="primary"
                variant="outline"
                class="px-6"
                @click="addExperience()"
                >Lưu</UButton
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

export default defineComponent({
  props: {
    public: {
      type: Boolean,
      default: false
    },
    experience: {
      type: Object,
      default: null
    }
  },
  setup(props) {
    interface experience {
      id: number
      name: string
      description: string
    }
    const openModal = ref(false)
    const nameModal = ref('')

    const openTemplate = (modal: string) => {
      nameModal.value = modal
      openModal.value = true
    }
    // Thêm Kinh nghiệm khác
    const { experience } = props
    const otherExperience = reactive({ experiences: [] as experience[], count: 0 })
    const addExperience = () => {
      const newExperience: experience = {
        id: otherExperience.count + 1,
        name: experience.title,
        description: experience.description
      }
      if (experience.title == '') {
        experience.error.value = 'Bạn chưa nhập tiêu đề cho kinh nghiệm của mình'
      } else if (experience.title.length < 8) {
        experience.error.value = 'Tiêu đề của bạn phải chứa ít nhất 8 kí tự'
      } else if (experience.description == '') {
        experience.error.value = 'Bạn chưa nhập mô tả cho kinh nghiệm của mình'
      } else if (experience.description.length < 8) {
        experience.error.value = 'Mô tả của bạn phải chứa ít nhất 8 kí tự'
      } else {
        otherExperience.experiences.push(newExperience)
        // reset các trường input
        otherExperience.count++
        experience.title = ''
        experience.description = ''
        experience.error.value = ''
        openModal.value = false
      }
    }
    const cancelExperience = () => {
      experience.title = ''
      experience.description = ''
      experience.error.value = ''
      openModal.value = false
    }
    return {
      otherExperience,
      addExperience,
      cancelExperience,
      openModal,
      nameModal,
      openTemplate
    }
  }
})
</script>

<style scoped>
.profile__experience {
  @apply md:rounded-xl px-4 md:p-4 md:mt-4 dark:text-tertiary-light md:border md:border-primary;
}
.profile__experience--header {
  @apply flex justify-between pb-4 border-t border-primary pt-4 md:pt-0 md:border-0;
}
.profile__experience--heading {
  @apply font-semibold text-lg;
}
.profile__experience--icon {
  @apply w-5 h-5 text-center rounded-full border-primary border text-primary cursor-pointer;
}
.profile__experience--content {
  @apply md:flex md:flex-row pb-2 mx-2 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-primary;
}
.profile__experience--action {
  @apply flex items-center justify-center font-bold gap-3;
}
.profile__experience--default {
  @apply text-green-600 font-medium hover:text-primary dark:hover:text-primary cursor-pointer;
}
</style>
