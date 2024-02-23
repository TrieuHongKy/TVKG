<script setup lang="ts">
import { reactive, ref } from 'vue'

interface Answer {
  title: string
  image?: string
  isClicked: boolean
  type: string
}
interface QuestionList {
  id: number
  question: string
  description: string
  answers: Answer[]
}
const question_list = ref<QuestionList>({
  id: 1,
  question: 'Bạn hãy chọn loại tài khoản mà bạn muốn đăng ký',
  description: 'Điều này sẽ giúp cho chúng tôi đưa ra những thông tin cần thiết phù hợp với loại tài khoản của bạn!',
  answers: [
    {
      title: 'Tôi là ứng viên đến để tìm công việc',
      image: '/images/create-profile/medal-icon.png',
      isClicked: false,
      type: 'candidate'
    },
    {
      title: 'Tôi là doanh nghiệp đến để tuyển dụng nhân sự',
      image: '/images/create-profile/phone-icon.png',
      isClicked: false,
      type: 'business'
    }
  ]
})

const role = ref('')

const handleCardClick = (index: number) => {
  const questionList = reactive(question_list.value)
  questionList.answers.forEach((answer, i) => {
    answer.isClicked = i === index
    if (i === index) {
      role.value = answer.type
    }
  })
}
watch(role, (newValue) => {
  console.log(newValue)
})
</script>
<template>
  <!-- Nội dung chính của trang -->
  <section class="goal flex flex-col justify-center">
    <div class="space-y-5 mx-5">
      <h2 class="text-xl font-semibold lg:text-4xl">{{ question_list.question }}</h2>
      <p class="text-sm lg:text-xl">{{ question_list.description }}</p>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-8 mt-5">
      <!-- Sử dụng v-for để hiển thị danh sách các card và xử lý sự kiện click -->
      <div class="grid grid-cols-8 col-span-6 col-start-2">
        <UCard
          v-for="(answer, index) in question_list.answers"
          :key="index"
          shadow="never"
          :class="{ 'card-goal': true, 'border-2 border-primary': answer.isClicked }"
          class="col-span-1 sm:col-span-4 m-4 dark:bg-secondary"
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
          <div class="flex flex-col justify-center items-center mt-2">
            <img class="mx-auto" :src="answer.image" alt="" />
            <h3 class="text-sm mt-10">{{ answer.title }}</h3>
          </div>
        </UCard>
      </div>
    </div>
  </section>
</template>
<style scoped></style>
