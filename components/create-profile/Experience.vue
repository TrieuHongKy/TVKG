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
const question_list = ref<QuestionList[]>([
  {
    id: 1,
    question: 'Một vài câu hỏi nhanh: đầu tiên, bạn đã từng làm việc tự do trước đây chưa?',
    description:
      'Điều này cho chúng tôi biết mức độ trợ giúp để cung cấp cho bạn trên đường đi. Chúng tôi sẽ không chia sẻ câu trả lời của bạn với bất kỳ ai khác, kể cả khách hàng tiềm năng.',
    answers: [
      {
        title: 'Tôi là tân binh siêu cấp',
        image: '/images/create-profile/lens-icon.png',
        isClicked: false
      },
      {
        title: 'Tôi có chút kinh nghiệm',
        image: '/images/create-profile/pen-icon.png',
        isClicked: false
      },
      {
        title: 'Tôi là siêu cấp chiến binh',
        image: '/images/create-profile/combatant-icon.png',
        isClicked: false
      }
    ]
  }
])

const handleCardClick = (index: number) => {
  question_list.value[0].answers.forEach((answer, i) => {
    answer.isClicked = i === index
  })
}
const emit = defineEmits(['showComponent'])
const showComponent = (componentName: string) => {
  // Gửi sự kiện lên component cha
  emit('showComponent', componentName)
}
</script>

<template>
  <!-- Nội dung chính của trang -->
  <section class="experience flex items-center justify-center dark:bg-theme-dark">
    <div v-for="item in question_list" :key="item.id" class="container">
      <div class="title-ex space-y-5 mx-5">
        <h2 class="text-xl lg:text-4xl">{{ item.question }}</h2>
        <p class="text-xs lg:text-xl">{{ item.description }}</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-6 mt-10">
        <!-- Sử dụng v-for để hiển thị danh sách các card và xử lý sự kiện click -->
        <UCard
          v-for="(answer, index) in item.answers"
          :key="index"
          shadow="never"
          :class="{ 'card-ex': true, 'border-2 border-primary': answer.isClicked }"
          class="col-span-2 m-5 mt-2 mb-2 dark:bg-secondary"
          @click="handleCardClick(index)"
        >
          <div class="relative">
            <div
              :class="{ 'bg-primary': answer.isClicked }"
              class="w-6 h-6 border rounded-full flex items-center justify-center absolute top-0 right-0"
            >
              <!-- Hình tròn bên trong -->
              <div class="w-4 h-4 border rounded-full flex items-center justify-center">
                <!-- Nội dung bên trong hình tròn -->
              </div>
            </div>
          </div>
          <div class="flex flex-col justify-center items-center">
            <img class="w-[145px] h-[130px]" :src="answer.image" alt="" />
            <h3 class="mt-10">{{ answer.title }}</h3>
          </div>
        </UCard>
      </div>
    </div>
  </section>
  <div class="fixed bottom-0 left-0 w-full bg-white dark:bg-theme-dark px-5">
    <div class="sticky bottom-0 bg-[#f2f7f2]">
      <div class="bg-primary w-1/3 h-1"></div>
    </div>
    <div class="flex justify-between py-2 mx-auto">
      <div class="order-first">
        <UButton
          :ui="{ rounded: 'rounded-full' }"
          size="lg"
          class="px-6"
          color="primary"
          variant="outline"
          @click="showComponent('Introduce')"
        >
          Quay lại
        </UButton>
      </div>
      <div class="order-last">
        <UButton
          :ui="{ rounded: 'rounded-full' }"
          size="lg"
          class="px-6"
          color="primary"
          variant="solid"
          @click="showComponent('Goal')"
        >
          Tiếp theo
        </UButton>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
