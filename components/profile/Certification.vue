<template>
  <div v-if="!public || certification.length > 0">
    <div class="profile__certification">
      <div class="profile__certification--header">
        <div class="profile__certification--heading">Chứng chỉ cá nhân</div>
        <div class="flex items-center justify-center font-bold gap-3">
          <UIcon
            v-if="!public"
            name="i-heroicons-plus-circle"
            class="profile__certification--icon"
            @click="openTemplate('addCertification')"
          ></UIcon>
        </div>
      </div>
      <div v-if="certification.length > 0" class="p-2">
        <div v-for="certificate in certification" :key="certificate.id" class="profile__certification--content">
          <div class="md:h-32 md:w-48 overflow-hidden mt-4">
            <img class="w-full h-full object-cover" :src="certificate.image" />
          </div>
          <div class="profile__certification--description">
            <div class="flex justify-between">
              <span class="profile__certification--title">
                {{ certificate.name }}
              </span>
              <div class="profile__certification--delete">
                <UIcon
                  v-if="!public"
                  name="i-heroicons-trash"
                  class="profile__certification--icon"
                  @click="openTemplate('deleteCertification')"
                ></UIcon>
              </div>
            </div>
            <span v-if="certificate.status === true">
              <p class="profile__certification--authentic">
                <span>Đã được xác minh bởi TVKG</span>
                <UIcon v-if="!public" class="text-primary text-base" solid name="i-heroicons-check-badge-solid" />
              </p>
            </span>
            <p class="mt-2">Nhà cung cấp:{{ certificate.provider }}</p>
            <p class="mt-2">
              {{ certificate.description }}
            </p>
          </div>
        </div>
      </div>
      <div v-if="!public && certification.length == 0" class="text-center">
        <div class="flex justify-center items-center mb-4">
          <img class="mx-auto h-40 w-40" src="~/assets/images/profile/certification.png" />
        </div>
        <div class="text-center mb-4">
          <p class="mb-2">
            Bổ sung các chứng chỉ của bạn có thể giúp chứng minh kiến thức hoặc khả năng cụ thể của bạn. (+10%)
          </p>
          <p class="profile__certification--additional" @click="openTemplate('addCertification')">
            Bổ sung chứng chỉ cá nhân của bạn
          </p>
        </div>
      </div>
    </div>
    <UModal v-model="openModal" prevent-close>
      <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center text-lg">
            <p v-if="nameModal === 'addCertification'">Thêm chứng nhỉ</p>
            <p v-if="nameModal === 'deleteCertification'">Xóa chứng nhỉ</p>
          </div>
        </template>
        <UFormGroup>
          <div>
            <div v-if="nameModal === 'addCertification'" class="flex flex-col gap-4">
              <div class="grid gap-2">
                <div class="flex flex-col gap-1"><label>Tên chứng chỉ</label></div>
                <UInput placeholder="Ví dụ: Microsoft Office Specialist Master" size="lg" />
                <div class="flex flex-col gap-1">
                  <label>Nhà cung cấp</label>
                  <UInput placeholder="Microsoft Office" size="lg" />
                </div>
                <div class="flex flex-col gap-1">
                  <label>Mô tả</label>
                  <UTextarea
                    size="lg"
                    placeholder="Ví dụ: Chứng chỉ hoàn thành Microsoft Office bậc thầy của Microsoft."
                  />
                </div>
                <div class="flex flex-col gap-1">
                  <label>URL chứng chỉ</label>
                  <UInput placeholder="https://..." size="lg" />
                </div>
              </div>
            </div>
            <div v-if="nameModal === 'deleteCertification'" class="flex flex-col gap-4">
              <div class="text-base font-light">
                <p class="pb-2">
                  Thao tác này sẽ xóa
                  <span class="text-base font-semibold">"Microsoft Office Specialist Master"</span> ra khỏi tất cả hồ sơ
                  của bạn.
                </p>
                <p>Bạn có chắc chắn muốn xóa chứng chỉ này không?</p>
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
                @click="openModal = false"
                >Hủy</UButton
              >
            </div>
            <div v-if="nameModal === 'deleteCertification'" class="DeletaButton">
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
                v-if="nameModal === 'addCertification'"
                :ui="{ rounded: 'rounded-full' }"
                size="lg"
                color="primary"
                variant="outline"
                class="px-6"
                @click="openModal = false"
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
    certification: {
      type: Object,
      default: null
    }
  },
  setup() {
    // Đóng, mở, lấy tên modal
    const openModal = ref(false)
    const nameModal = ref('')

    const openTemplate = (modal: string) => {
      nameModal.value = modal
      openModal.value = true
    }

    return {
      openModal,
      nameModal,
      openTemplate
    }
  }
})
</script>

<style scoped>
.profile__certification {
  @apply p-4 pt-4 dark:text-tertiary-light border-t border-primary;
}
.profile__certification--header {
  @apply flex justify-between;
}
.profile__certification--heading {
  @apply font-semibold text-lg;
}
.profile__certification--icon {
  @apply w-5 h-5 text-center rounded-full border-primary border text-primary cursor-pointer;
}
.profile__certification--delete {
  @apply flex items-center justify-center font-bold gap-3;
}
.profile__certification--content {
  @apply md:flex md:flex-row pb-4 [&:not(:last-child)]:border-b border-primary;
}
.profile__certification--description {
  @apply mt-2 ml-2 md:mt-4 md:ml-4 w-full;
}
.profile__certification--title {
  @apply font-semibold;
}
.profile__certification--additional {
  @apply text-green-600 font-medium hover:text-primary dark:hover:text-primary cursor-pointer;
}
.profile__certification--authentic {
  @apply flex items-center gap-2 text-sm mt-2 text-green-600;
}
</style>
