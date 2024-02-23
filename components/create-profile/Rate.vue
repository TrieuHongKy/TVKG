<script setup lang="ts">
import { ref } from 'vue'

interface QuestionList {
  id: number
  question: string
  description: string
}

const question_list = ref<QuestionList>({
  id: 1,
  question: 'Bạn hãy đặt mức lương theo giờ của bạn.',
  description:
    'Khi bạn đăng tải hồ sơ của mình, khách hàng sẽ thấy mức giá này trên trang cá nhân của bạn và trong kết quả tìm kiếm. Bạn có thể điều chỉnh mức giá mỗi khi bạn gửi đề xuất.'
})
</script>

<template>
  <section class="rate flex justify-center p-4">
    <div class="container lg:mx-auto">
      <div class="space-y-5">
        <span>9/10</span>
        <div class="text-xl font-medium lg:text-[36px]">{{ question_list.question }}</div>
        <div class="lg:text-[16px] leading-tight">{{ question_list.description }}</div>
      </div>
      <div class="flex flex-col mt-5">
        <proposal-salary></proposal-salary>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
