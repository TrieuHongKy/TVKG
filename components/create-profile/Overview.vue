<script setup lang="ts">
import { ref } from 'vue'

interface Card {
  text: string
  image?: string
  author: string
}
interface Stats {
  total: number
  icon: string
}
interface QuestionList {
  id: number
  question: string
  description: string
  cards: Card[]
  stats: Stats[]
}

const question_list = ref<QuestionList>({
  id: 1,
  question: 'Tuyệt vời. Bây giờ hãy viết tiểu sử để nói với thế giới về bản thân bạn.',
  description:
    'Giúp mọi người làm quen với bạn trong nháy mắt. Bạn làm công việc gì tốt nhất? Nói rõ ràng, sử dụng các đoạn văn hoặc gạch đầu dòng. Bạn luôn có thể chỉnh sửa sau; chỉ cần đảm bảo rằng bạn đã đọc lại ngay bây giờ.',
  cards: [
    {
      image:
        'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
      text: 'Tôi là một nhà phát triển có kinh nghiệm trong việc xây dựng trang web cho các doanh nghiệp tạo cửa hàng trực tuyến mới, tôi đều có thể trợ giúp Biết HTML và CSS3, PHP, jQuery, Wordpress và SEO',
      author: 'Mẹo chuyên nghiệp của TVKG.'
    }
  ],
  stats: [
    {
      icon: 'i-heroicons-star',
      total: 5
    },
    {
      icon: 'i-heroicons-currency-dollar',
      total: 200000
    },
    {
      icon: 'i-heroicons-briefcase',
      total: 35
    }
  ]
})

const jobs = ref('')
const jobsError = ref('')
const canProceed = ref(false)
const validateInput = () => {
  if (jobs.value && jobs.value.trim().length >= 20) {
    jobsError.value = ''
    canProceed.value = true
  } else {
    jobsError.value = 'Vui lòng nhập ít nhất 50 kí tự trở lên'
    canProceed.value = false
  }
}
const formatVND = (number: number | bigint) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number)
}
</script>
<template>
  <section class="overview flex justify-center p-4">
    <div class="flex justify-center">
      <div class="grid grid-cols-1 md:grid-cols-5">
        <div class="col-span-3 space-y-5">
          <span>7/10</span>
          <h2 class="text-xl font-medium lg:text-[35px] leading-tight">{{ question_list.question }}</h2>
          <p class="text-sm mt-5 lg:text-[16px] leading-relaxed">{{ question_list.description }}</p>
          <div class="md:w-full mt-4">
            <UTextarea
              v-model="jobs"
              type="text"
              placeholder="Nhập tiểu sử ở đây..."
              color="white"
              variant="outline"
              :rows="7"
              class="rounded-lg w-full"
              @change="validateInput"
            ></UTextarea>
            <span class="flex text-xs text-red-700">{{ jobsError }}</span>
          </div>
        </div>
        <div class="col-span-2 flex justify-center mb-10 mt-4">
          <UCard
            v-for="(card, index) in question_list.cards"
            :key="index"
            shadow="never"
            class="w-full md:w-[400px] h-auto rounded-lg dark:bg-secondary"
          >
            <div class="flex flex-col sm:flex-row w-full md:flex-col">
              <div class="flex items-center relative w-full sm:w-[50%] md:w-auto justify-center md:mx-32 lg:mt-0">
                <img
                  class="w-[50%] md:h-[100px] md:w-[100px] rounded-full ring-2 ring-white dark:ring-gray-800"
                  :src="card.image"
                  alt="Image Description"
                />
              </div>
              <div class="w-full sm:w-[50%] md:w-auto">
                <div class="flex m-5 space-x-2 justify-center">
                  <div v-for="(stat, index) in question_list.stats" :key="index" class="px-1">
                    <div class="flex items-center space-x-1">
                      <UIcon :name="stat.icon" />
                      <p>{{ formatVND(stat.total) }}</p>
                    </div>
                  </div>
                </div>
                <p class="text-sm mt-5">{{ card.text }}</p>
                <p class="text-xs text-gray-400 italic flex justify-end mt-2">{{ card.author }}</p>
              </div>
            </div>
          </UCard>
        </div>
      </div>
    </div>
  </section>
</template>
