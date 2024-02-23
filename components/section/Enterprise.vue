<template>
  <div class="enterprise__section">
    <div class="enterprise__section--content">
      <img
        class="block md:hidden w-full rounded-tl-xl rounded-tr-xl h-1/4"
        src="https://cdn.pixabay.com/photo/2017/10/10/21/47/laptop-2838921_1280.jpg"
        alt="Ảnh minh họa"
      />
      <div class="md:w-7/12 p-9 md:p-12 flex flex-col gap-6">
        <span class="enterprise__section--title">Bộ doanh nghiệp</span>
        <p class="w-full text-3xl md:leading-tight md:text-5xl font-semibold text-emerald-300">
          <!-- <span class="text-tertiary-light">Đây là cách</span><br /> -->
          Đây là cách các công ty tốt tìm được ứng viên tốt
        </p>
        <span class="enterprise__section--description">
          Tiếp cận 1% ứng viên tài năng hàng đầu trên TVKG và bộ công cụ quản lý lực lượng lao động kết hợp đầy đủ. Đây
          là cách đổi mới hoạt động bây giờ.</span
        >
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <div class="flex flex-row gap-4">
              <UIcon class="enterprise__section--icon" name="i-heroicons-user-group" />
              <span class="text-sm md:text-base text-tertiary-light"
                >Tiếp cận tài năng chuyên gia để lấp đầy khoảng trống kỹ năng của bạn</span
              >
            </div>
            <div class="flex flex-row gap-4">
              <UIcon class="enterprise__section--icon" name="i-heroicons-briefcase" />
              <span class="text-sm md:text-base text-tertiary-light"
                >Kiểm soát quy trình làm việc của bạn: thuê, phân loại và trả lương cho ứng viên</span
              >
            </div>
            <div class="flex flex-row gap-4">
              <UIcon class="enterprise__section--icon" name="i-heroicons-chart-bar" />
              <span class="text-sm md:text-base text-tertiary-light"
                >Hợp tác với TVKG để được hỗ trợ từ đầu đến cuối trong công cuộc tìm và ứng tuyển công việc</span
              >
            </div>
          </div>
          <div class="w-full">
            <UButton to="#" color="white" target="blank" :ui="{ rounded: 'rounded-full' }">Tìm hiểu thêm </UButton>
          </div>
        </div>
      </div>
      <div class="md:w-1/3 hidden md:block">
        <img
          class="h-full rounded-tr-xl rounded-br-xl object-cover object-center"
          src="https://cdn.pixabay.com/photo/2017/10/10/21/47/laptop-2838921_1280.jpg"
          alt="Ảnh minh họa"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SectionEnterprise',
  components: {}
})
</script>
<style scoped>
.enterprise__section {
  @apply w-full md:p-4;
}
.enterprise__section--content {
  @apply bg-secondary rounded-xl flex flex-col md:flex-row justify-between;
}
.enterprise__section--title {
  @apply text-tertiary-light text-lg md:text-2xl font-medium md:pb-4;
}
.enterprise__section--description {
  @apply text-sm md:text-base leading-6 text-tertiary-light;
}
.enterprise__section--icon {
  @apply text-emerald-400 w-[30px] text-3xl;
}
</style>
