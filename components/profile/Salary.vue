<template>
  <div>
    <div class="profile__salary">
      <div v-if="profilesData.showSalary == 0 && !public" class="profile__salary--default">
        <p class="text-gray-500">Bạn chưa cập nhật số tiền của mình</p>
        <u class="profile__salary--action" @click="openTemplate('editSalary')">Cập nhật ngay</u>
      </div>
      <div v-if="profilesData.showSalary > 0">
        <span class="profile__salary--content"
          ><i>{{ formatCurrency(profilesData.showSalary) }} triệu/ Tháng</i></span
        >
        <UIcon
          v-if="!public"
          name="i-heroicons-pencil-square"
          class="profile__salary--icon"
          @click="openTemplate('editSalary')"
        ></UIcon>
      </div>
      <div v-if="profilesData.showSalary == 0 && public" class="font-semibold py-2">
        <p class="hidden md:block">Mức Lương</p>
        <p class="text-gray-500 font-normal px-0 md:px-4 pt-2">Tài khoản này chưa cập nhật lương cố định</p>
      </div>
    </div>
    <UModal v-model="openModal" prevent-close>
      <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center text-lg">
            <p v-if="nameModal === 'editSalary'">Chỉnh sửa mức giá theo giờ</p>
          </div>
        </template>
        <UFormGroup>
          <div v-if="nameModal === 'editSalary'" class="flex flex-col gap-4">
            <div class="flex flex-col gap-2 text-sm font-light">
              <p>Xin lưu ý rằng tỷ lệ hàng giờ mới của bạn sẽ chỉ áp dụng cho các hợp đồng mới.</p>
              <p v-if="profilesData.showSalary == 0">Bạn chưa có số tiền cụ thể cho công việc của mình</p>
              <p v-else>Số tiền của bạn sẽ là: {{ formatCurrency(profilesData.showSalary) }} đ/ giờ</p>
            </div>
            <proposal-total-salary @update-values="updateSalary"></proposal-total-salary>
            <i v-if="totalSalary == 0 && salaryError !== ''" class="text-xs text-red-600">{{ salaryError }}</i>
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
            <div class="SaveButton">
              <UButton
                :ui="{ rounded: 'rounded-full' }"
                size="lg"
                color="primary"
                variant="outline"
                class="px-6"
                @click="saveSalary()"
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
import { profilesData } from '~/apis/mock-data/profiles'

export default defineComponent({
  props: {
    public: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const openModal = ref(false)
    const nameModal = ref('')

    const openTemplate = (modal: string) => {
      nameModal.value = modal
      openModal.value = true
    } // Edit Salary
    let totalSalary = ref(0)
    const salaryError = ref('')

    const updateSalary = (values: { totalSalary: number }) => {
      totalSalary.value = values.totalSalary
    }
    const saveSalary = () => {
      if (totalSalary.value == 0) {
        salaryError.value = 'Số tiền bạn nhập không thể bằng 0'
      } else {
        profilesData.showSalary = totalSalary.value
        salaryError.value = ''
        openModal.value = false
      }
    }
    const formatCurrency = (value: number | bigint) => {
      let formatted = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
      }).format(value)
      return formatted.replace('₫', '').trim()
    }
    return {
      openModal,
      nameModal,
      openTemplate,
      // Cập nhật và hiển thị Tiền lương
      totalSalary,
      profilesData,
      salaryError,
      updateSalary,
      saveSalary,
      // Format giá trị tiền VND
      formatCurrency
    }
  }
})
</script>

<style scoped>
.profile__salary {
  @apply py-2 md:py-0;
}
.profile__salary--default {
  @apply flex flex-col px-0 md:px-4 py-2 md:flex-row gap-2 md:items-center;
}
.profile__salary--content {
  @apply font-medium p-4;
}
.profile__salary--action {
  @apply text-sm text-green-600 hover:text-primary dark:hover:text-primary cursor-pointer;
}
.profile__salary--icon {
  @apply w-5 h-5 text-center rounded-full border-primary border text-primary cursor-pointer;
}
</style>
