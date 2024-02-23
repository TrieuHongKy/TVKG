<script setup lang="ts">
import { ref } from 'vue'

interface Answer {
  title: string
  image?: string
  isClicked: boolean
}
interface QuestionList {
  id: number
  question: string
  description: string
  answers: Answer[]
}

const question_list = ref<QuestionList>({
  id: 1,
  question: 'Một vài câu hỏi nhanh: đầu tiên, bạn đã từng làm việc tự do trước đây chưa?',
  description:
    'Điều này cho chúng tôi biết mức độ trợ giúp để cung cấp cho bạn trên đường đi. Chúng tôi sẽ không chia sẻ câu trả lời của bạn với bất kỳ ai khác, kể cả khách hàng tiềm năng.',
  answers: [
    {
      title: 'Tôi muốn tự mình tìm kiếm cơ hội',
      image: '/images/create-profile/tv-icon.png',
      isClicked: false
    },
    {
      title: 'Tôi muốn đóng gói công việc của mình cho khách hàng mua',
      image: '/images/create-profile/item-icon.png',
      isClicked: false
    }
  ]
})

const handleCardClick = (index: number) => {
  question_list.value.answers.forEach((answer, i) => {
    answer.isClicked = i === index
  })
}
</script>

<template>
  <section class="work-preference">
    <div class="">
      <div class="space-y-5 py-5 mx-5">
        <h2 class="text-xl font-semibold lg:text-4xl">{{ question_list.question }}</h2>
        <p class="text-sm lg:text-xl">{{ question_list.description }}</p>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12">
        <div class="hidden md:block md:col-span-2"></div>
        <!-- Sử dụng v-for để hiển thị danh sách các card và xử lý sự kiện click -->
        <UCard
          v-for="(answer, index) in question_list.answers"
          :key="index"
          shadow="never"
          :class="{ 'card-work': true, 'border-2 border-primary': answer.isClicked }"
          class="mx-4 mt-2 dark:bg-secondary md:col-span-4"
          @click="handleCardClick(index)"
        >
          <div class="relative">
            <div
              :class="{ 'bg-primary': answer.isClicked }"
              class="w-6 h-6 border rounded-full flex items-center justify-center absolute top-0 right-0"
            >
              <div class="w-4 h-4 border rounded-full flex items-center justify-center"></div>
            </div>
          </div>
          <div class="flex flex-col justify-center items-center">
            <img class="w-[140px] h-auto" :src="answer.image" alt="" />
            <h3 class="text-sm lg:text-[20px] mt-5">{{ answer.title }}</h3>
          </div>
        </UCard>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
