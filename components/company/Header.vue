<template>
  <div class="flex flex-col company__section">
    <div class="w-full">
      <img class="w-full h-auto md:h-[240px] rounded-tl-xl rounded-tr-xl" :src="company?.banner" />
    </div>
    <div class="flex gap-2 sm:gap-2 pb-2">
      <div class="w-1/3 flex items-center justify-center">
        <img class="w-auto object-cover p-2 max-h-[200px]" :src="company?.company_logo" :alt="company?.company_name" />
      </div>
      <div class="w-2/3 flex flex-col gap-2">
        <div class="flex flex-col gap-2">
          <p class="pt-4 text-base sm:text-xl font-semibold line-clamp-2">
            {{ company?.company_name }}
          </p>
          <p class="flex text-xs sm:text-lg gap-2 md:gap-6">
            <!-- <span class="font-light text-gray-600 dark:text-gray-400">{{ follow }} lượt theo dõi</span>
            <span class="font-light text-green-600">14 tin tuyển dụng</span> -->
          </p>
        </div>
        <p class="flex items-center text-sm sm:text-base md:gap-2">
          Đã được xác thực bởi TVKG
          <UIcon name="i-heroicons-check-badge-solid" class="text-primary text-lg"></UIcon>
        </p>
        <div class="details__bussiness--button">
          <div @click="toggleFollow">
            <UButton
              :ui="{ rounded: 'rounded-full' }"
              class="sm:px-6 py-2 sm:text-sm"
              :icon="statusFollow ? 'i-heroicons-check-solid' : 'i-heroicons-bell'"
              size="xs"
              variant="solid"
              color="primary"
              :label="statusFollow ? 'Đã theo dõi' : 'Theo dõi'"
            >
            </UButton>
          </div>
          <div>
            <UButton
              :ui="{ rounded: 'rounded-full' }"
              class="sm:px-6 py-2 sm:text-sm"
              icon="i-heroicons-chat-bubble-oval-left-ellipsis"
              size="xs"
              variant="outline"
              color="primary"
              >Nhắn tin
            </UButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import type { Company } from '~/types/job'

export default defineComponent({
  props: {
    company: {
      type: Object,
      default: () => ({}) as Company
    }
  },
  setup() {
    const toastCompany = useToast()

    const statusFollow = ref(false)

    const toggleFollow = () => {
      statusFollow.value = !statusFollow.value
      toastCompany.add({
        title: statusFollow.value ? 'Theo dõi thành công' : 'Bỏ theo dõi thành công',
        icon: statusFollow.value ? 'i-heroicons-check-circle-solid' : 'i-heroicons-x-circle-solid',
        timeout: 2000
      })
    }
    return { toastCompany, statusFollow, toggleFollow }
  }
})
</script>

<style scoped>
.details__bussiness--button {
  @apply flex gap-2 py-2 mr-2;
}
</style>
