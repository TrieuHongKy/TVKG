<template>
  <div class="job__filter ct-card">
    <UForm :validate="validate" :state="state" @submit="submit">
      <div class="flex flex-col gap-2">
        <UFormGroup name="salary">
          <p class="filter--heading">LỌC THEO MỨC LƯƠNG</p>
          <div class="filter--secleted my-2">
            <USelectMenu v-model="valueSalary" placeholder="Tìm theo mức lương" :options="optionsSalary" class="">
            </USelectMenu>
          </div>
        </UFormGroup>
        <UFormGroup name="location">
          <p class="filter--heading">LỌC THEO ĐỊA ĐIỂM</p>
          <div class="filter--secleted my-2">
            <USelectMenu v-model="valueLocation" placeholder="Tìm theo địa điểm" :options="optionsLocation" class="">
            </USelectMenu>
          </div>
        </UFormGroup>
        <UFormGroup name="position">
          <button class="filter--heading" @click="togglePositionFilter">
            <p class="filter--heading">LỌC THEO CẤP BẬC</p>
            <UIcon
              name="i-heroicons-chevron-down"
              class="filter--icon"
              :class="{ 'rotate-180': showPositionFilter }"
            ></UIcon>
          </button>
          <div v-if="showPositionFilter" class="filter--secleted my-2">
            <UFormGroup>
              <div class="filter--options">
                <UCheckbox
                  v-for="option in optionsPosition"
                  :key="option.value"
                  :ui="{ label: 'font-medium text-sm sm:text-base text-gray-500 dark:text-gray-200' }"
                  :value="option.value"
                  :label="option.label"
                >
                  {{ option.label }}
                </UCheckbox>
              </div>
            </UFormGroup>
          </div>
        </UFormGroup>
        <UFormGroup name="type">
          <button class="filter--heading" @click="toggleTypeFilter">
            <p class="filter--heading">LỌC THEO LOẠI HÌNH</p>
            <UIcon
              name="i-heroicons-chevron-down"
              class="filter--icon"
              :class="{ 'rotate-180': showTypeFilter }"
            ></UIcon>
          </button>
          <div v-if="showTypeFilter" class="filter--secleted my-2">
            <UFormGroup>
              <div class="filter--options">
                <UCheckbox
                  v-for="option in optionsType"
                  :key="option.value"
                  :ui="{ label: 'font-medium text-sm sm:text-base text-gray-500 dark:text-gray-200' }"
                  :value="option.value"
                  :label="option.label"
                >
                  {{ option.label }}
                </UCheckbox>
              </div>
            </UFormGroup>
          </div>
        </UFormGroup>
        <UFormGroup name="experience">
          <button class="filter--heading" @click="toggleExperienceFilter">
            <p class="filter--heading">LỌC THEO KINH NGHIỆM</p>
            <UIcon
              name="i-heroicons-chevron-down"
              class="filter--icon"
              :class="{ 'rotate-180': showExperienceFilter }"
            ></UIcon>
          </button>
          <div v-if="showExperienceFilter" class="filter--secleted my-2">
            <UFormGroup>
              <div class="filter--options">
                <UCheckbox
                  v-for="option in optionsExperience"
                  :key="option.value"
                  :ui="{ label: 'font-medium text-sm sm:text-base text-gray-500 dark:text-gray-200' }"
                  :value="option.value"
                  :label="option.label"
                >
                  {{ option.label }}
                </UCheckbox>
              </div>
            </UFormGroup>
          </div>
        </UFormGroup>
      </div>
    </UForm>
  </div>
</template>
<script lang="ts">
import { ref } from 'vue'
import type { FormError, FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'

export default defineComponent({
  name: 'SearchBar',
  setup() {
    const optionsMajor = [
      {
        value: 'Hành chính / Văn phòng',
        label: 'Hành chính / Văn phòng'
      },
      {
        value: 'Quảng cáo / Marketing / PR',
        label: 'Quảng cáo / Marketing / PR'
      },
      {
        value: 'Bán hàng / Tư vấn',
        label: 'Bán hàng / Tư vấn'
      },
      {
        value: 'Kế toán / Kiểm toán',
        label: 'Kế toán / Kiểm toán'
      },
      {
        value: 'Du lịch / Nhà hàng / Khách sạn',
        label: 'Du lịch / Nhà hàng / Khách sạn'
      },
      {
        value: 'Công nghệ thông tin',
        label: 'Công nghệ thông tin'
      },
      {
        value: 'Nội trợ / Gia đình',
        label: 'Nội trợ / Gia đình'
      },
      {
        value: 'Cơ khí / Kỹ thuật ứng dụng',
        label: 'Cơ khí / Kỹ thuật ứng dụng'
      },
      {
        value: 'Ngân hàng / Thuế',
        label: 'Ngân hàng / Thuế'
      }
    ]
    const optionsLocation = [
      { value: 'An Giang', label: 'An Giang' },
      { value: 'Bà Rịa - Vũng Tàu', label: 'Bà Rịa - Vũng Tàu' },
      { value: 'Bắc Giang', label: 'Bắc Giang' },
      { value: 'Bắc Kạn', label: 'Bắc Kạn' },
      { value: 'Bạc Liêu', label: 'Bạc Liêu' },
      { value: 'Bắc Ninh', label: 'Bắc Ninh' },
      { value: 'Bến Tre', label: 'Bến Tre' },
      { value: 'Bình Định', label: 'Bình Định' },
      { value: 'Bình Dương', label: 'Bình Dương' },
      { value: 'Bình Phước', label: 'Bình Phước' },
      { value: 'Bình Thuận', label: 'Bình Thuận' },
      { value: 'Cà Mau', label: 'Cà Mau' },
      { value: 'Cần Thơ', label: 'Cần Thơ' },
      { value: 'Cao Bằng', label: 'Cao Bằng' },
      { value: 'Đà Nẵng', label: 'Đà Nẵng' },
      { value: 'Đắk Lắk', label: 'Đắk Lắk' },
      { value: 'Đắk Nông', label: 'Đắk Nông' },
      { value: 'Điện Biên', label: 'Điện Biên' },
      { value: 'Đồng Nai', label: 'Đồng Nai' },
      { value: 'Đồng Tháp', label: 'Đồng Tháp' },
      { value: 'Gia Lai', label: 'Gia Lai' },
      { value: 'Hà Giang', label: 'Hà Giang' },
      { value: 'Hà Nam', label: 'Hà Nam' },
      { value: 'Hà Nội', label: 'Hà Nội' },
      { value: 'Hà Tĩnh', label: 'Hà Tĩnh' },
      { value: 'Hải Dương', label: 'Hải Dương' },
      { value: 'Hải Phòng', label: 'Hải Phòng' },
      { value: 'Hậu Giang', label: 'Hậu Giang' },
      { value: 'Hòa Bình', label: 'Hòa Bình' },
      { value: 'Hưng Yên', label: 'Hưng Yên' },
      { value: 'Khánh Hòa', label: 'Khánh Hòa' },
      { value: 'Kiên Giang', label: 'Kiên Giang' },
      { value: 'Kon Tum', label: 'Kon Tum' },
      { value: 'Lai Châu', label: 'Lai Châu' },
      { value: 'Lâm Đồng', label: 'Lâm Đồng' },
      { value: 'Lạng Sơn', label: 'Lạng Sơn' },
      { value: 'Lào Cai', label: 'Lào Cai' },
      { value: 'Long An', label: 'Long An' },
      { value: 'Nam Định', label: 'Nam Định' },
      { value: 'Nghệ An', label: 'Nghệ An' },
      { value: 'Ninh Bình', label: 'Ninh Bình' },
      { value: 'Ninh Thuận', label: 'Ninh Thuận' },
      { value: 'Phú Thọ', label: 'Phú Thọ' },
      { value: 'Phú Yên', label: 'Phú Yên' },
      { value: 'Quảng Bình', label: 'Quảng Bình' },
      { value: 'Quảng Nam', label: 'Quảng Nam' },
      { value: 'Quảng Ngãi', label: 'Quảng Ngãi' },
      { value: 'Quảng Ninh', label: 'Quảng Ninh' },
      { value: 'Quảng Trị', label: 'Quảng Trị' },
      { value: 'Sóc Trăng', label: 'Sóc Trăng' },
      { value: 'Sơn La', label: 'Sơn La' },
      { value: 'Tây Ninh', label: 'Tây Ninh' },
      { value: 'Thái Bình', label: 'Thái Bình' },
      { value: 'Thái Nguyên', label: 'Thái Nguyên' },
      { value: 'Thanh Hóa', label: 'Thanh Hóa' },
      { value: 'Thừa Thiên - Huế', label: 'Thừa Thiên - Huế' },
      { value: 'Tiền Giang', label: 'Tiền Giang' },
      { value: 'TP HCM', label: 'TP HCM' },
      { value: 'Trà Vinh', label: 'Trà Vinh' },
      { value: 'Tuyên Quang', label: 'Tuyên Quang' },
      { value: 'Vĩnh Long', label: 'Vĩnh Long' },
      { value: 'Vĩnh Phúc', label: 'Vĩnh Phúc' },
      { value: 'Yên Bái', label: 'Yên Bái' }
    ]
    const optionsSalary = [
      { value: 'Dưới 3 triệu', label: 'Dưới 3 triệu' },
      { value: 'Từ 3 - 5 triệu', label: 'Từ 3 - 5 triệu' },
      { value: 'Từ 6 - 10 triệu', label: 'Từ 6 - 10 triệu' },
      { value: 'Từ 11 - 15 triệu', label: 'Từ 11 - 15 triệu' },
      { value: 'Từ 16 - 20 triệu', label: 'Từ 16 - 20 triệu' },
      { value: 'Từ 21 - 30 triệu', label: 'Từ 21 - 30 triệu' },
      { value: 'Trên 30 triệu', label: 'Trên 30 triệu' }
    ]
    const optionsPosition = [
      { value: 'Sinh viên - Thực tập sinh', label: 'Sinh viên - Thực tập sinh' },
      { value: 'Nhân viên - Chuyên viên', label: 'Nhân viên - Chuyên viên' },
      { value: 'Trưởng nhóm - Giám sát', label: 'Trưởng nhóm - Giám sát' },
      { value: 'Quản lý', label: 'Quản lý' },
      { value: 'Điều hành cấp cao', label: 'Điều hành cấp cao' }
    ]
    const optionsType = [
      { value: 'Toàn thời gian', label: 'Toàn thời gian' },
      { value: 'Bán thời gian', label: 'Bán thời gian' },
      { value: 'Remote - Làm việc từ xa', label: 'Remote - Làm việc từ xa' }
    ]
    const optionsExperience = [
      { value: 'Dưới 1 năm', label: 'Dưới 1 năm' },
      { value: 'Từ 2 năm', label: 'Từ 2 năm' },
      { value: 'Từ 3 năm', label: 'Từ 3 năm' },
      { value: 'Từ 4 năm', label: 'Từ 4 năm' },
      { value: 'Trên 5 năm', label: 'Trên 5 năm' }
    ]
    const valueExperience = ref()
    const valueType = ref()
    const valuePosition = ref()
    const valueSalary = ref('Tất cả')
    const valueMajor = ref()
    const valueLocation = ref()
    const jobName = ref()
    const state = ref({
      email: undefined,
      password: undefined
    })
    const showAdvancedFilter = ref(false)
    const showPositionFilter = ref(true)
    function togglePositionFilter() {
      showPositionFilter.value = !showPositionFilter.value
    }
    const showTypeFilter = ref(true)
    function toggleTypeFilter() {
      showTypeFilter.value = !showTypeFilter.value
    }
    const showExperienceFilter = ref(true)
    function toggleExperienceFilter() {
      showExperienceFilter.value = !showExperienceFilter.value
    }
    const validate = (state: any): FormError[] => {
      const errors = []
      if (!state.email) errors.push({ path: 'email', message: 'Required' })
      if (!state.password) errors.push({ path: 'password', message: 'Required' })
      return errors
    }
    async function submit(event: FormSubmitEvent<any>) {
      // eslint-disable-next-line no-console
      console.log(event.data)
    }
    return {
      state,
      validate,
      submit,
      optionsMajor,
      optionsLocation,
      optionsSalary,
      optionsPosition,
      optionsType,
      optionsExperience,
      valueExperience,
      valueType,
      valuePosition,
      valueSalary,
      valueMajor,
      valueLocation,
      jobName,
      showAdvancedFilter,
      showPositionFilter,
      togglePositionFilter,
      showTypeFilter,
      toggleTypeFilter,
      showExperienceFilter,
      toggleExperienceFilter
    }
  }
})
</script>
<style scoped>
.job__filter {
  @apply hidden sticky top-20 md:block basis-1/4 p-3 h-fit;
}
.filter--heading {
  @apply text-sm sm:text-base font-semibold flex flex-row justify-between w-[96%];
}
.filter--options {
  @apply flex flex-col gap-1;
}
.filter--icon {
  @apply transform transition-transform duration-300 ease-out;
}
</style>
