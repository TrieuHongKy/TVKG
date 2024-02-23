<template>
  <div class="section__client">
    <div
      class="flex flex-col gap-10 rounded-xl p-6 bg-cover bg-no-repeat bg-center bg-[url('https://cdn.pixabay.com/photo/2015/07/28/22/01/office-865091_1280.jpg')]"
    >
      <div class="md:w-2/3 lg:w-1/2">
        <span class="text-xl text-tertiary-light">Đối với khách hàng</span>
        <div class="text-3xl md:text-6xl leading-[1.1] font-semibold tracking-wide text-tertiary-light mt-20 md:mt-24">
          <p class="leading-tight tracking-tight">Tìm ứng viên theo cách của bạn</p>
        </div>
      </div>
      <div class="md:w-2/3 lg:w-1/2">
        <span class="text-base md:text-lg text-tertiary-light"
          >Làm việc với mạng lưới lớn nhất gồm các chuyên gia độc lập và hoàn thành công việc—từ những thay đổi nhanh
          chóng đến những biến đổi lớn.</span
        >
      </div>
      <div class="md:w-full flex flex-col md:flex-row gap-6 md:gap-10">
        <div class="w-full md:w-1/3">
          <div class="section__client--button">
            <a href="#" target="_blank" class="section__client--title">
              <span class="text-xl md:text-2xl">Đăng công việc và thuê một chuyên gia</span>
              <p class="section__client--text">Ứng viên tài năng</p>
            </a>
          </div>
        </div>
        <div class="w-full md:w-1/3">
          <div class="section__client--button">
            <a href="#" target="_blank" class="section__client--title">
              <span class="text-xl md:text-2xl">Duyệt và mua dự án</span>
              <p class="section__client--text">Danh mục dự án</p>
            </a>
          </div>
        </div>
        <div class="w-full md:w-1/3">
          <div class="section__client--button">
            <a href="#" target="_blank" class="section__client--title">
              <span class="text-xl md:text-2xl">Nhận lời khuyên từ chuyên gia trong ngành</span>
              <p class="section__client--text">Tư vấn</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SectionClient'
})
</script>
<style scoped>
.section__client {
  @apply w-full md:p-4;
}
.section__client--button {
  @apply p-6 h-full hover:bg-secondary dark:hover:text-tertiary dark:bg-secondary dark:hover:bg-primary text-tertiary-light rounded-xl bg-primary;
}
.section__client--title {
  @apply text-inherit flex flex-col justify-between h-full font-medium;
}
.section__client--text {
  @apply flex items-center text-sm gap-2 pt-4 md:pt-6;
}
</style>
