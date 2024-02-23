<script setup lang="ts">
import { ref } from 'vue'

interface Card {
  text: string
  image?: string
  author: string
}
interface Modal {
  text: string
  title: string
  author: string
}
interface QuestionList {
  id: number
  question: string
  description: string
  cards: Card[]
  modals: Modal[]
}

const question_list = ref<QuestionList[]>([
  {
    id: 1,
    question: 'Gần xong rồi! Bạn ở đây để làm công việc gì?',
    description:
      'Kỹ năng của bạn cho khách hàng thấy những gì bạn có thể cung cấp và giúp chúng tôi chọn những công việc để giới thiệu cho bạn. Thêm hoặc xóa những cái chúng tôi đã đề xuất hoặc bắt đầu nhập để chọn thêm. Tùy bạn đấy.',
    cards: [
      {
        image: 'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png',
        text: 'Hồ sơ của bạn là cách bạn nổi bật giữa đám đông. Đó là thứ bạn sử dụng để giành được công việc, vì vậy hãy biến nó thành một hồ sơ tốt.',
        author: '~Mẹo Tìm Việc Kiên Giang mách bạn đấy!😉~'
      }
    ],
    modals: [
      {
        title: 'Mẹo chuyên nghiệp của Tìm Việc Kiên Giang',
        text: '“Thuật toán của Tìm Việc Kiên Giang sẽ đề xuất các bài đăng công việc cụ thể cho bạn dựa trên kỹ năng của bạn. Vì vậy, hãy chọn chúng thật cẩn thận để có được trận đấu tốt nhất!',
        author: '~Mẹo Tìm Việc Kiên Giang mách bạn đấy!😉~ '
      }
    ]
  }
])
const jobs = ref('')
const jobsError = ref('')
const canProceed = ref(false)
const validateInput = () => {
  if (jobs.value && jobs.value.trim().length >= 8) {
    jobsError.value = ''
    canProceed.value = true
  } else {
    jobsError.value = 'Vui lòng nhập từ 8 kí tự trở lên'
    canProceed.value = false
  }
}
const isOpen = ref(false)
</script>

<template>
  <section class="skills flex items-center justify-center p-4">
    <div v-for="item in question_list" :key="item.id" class="container dark:bg-theme-dark">
      <div class="grid grid-cols-1 md:grid-cols-2">
        <div class="flex-col space-y-5">
          <span>6/10</span>
          <h2 class="text-xl lg:text-[35px] font-medium leading-tight">{{ item.question }}</h2>
          <p class="text-xs mt-5 lg:text-[16px] leading-relaxed">{{ item.description }}</p>
          <p class="text-primary underline" @click="isOpen = true">Tại sao lựa chọn cẩn thận lại quan trọng</p>
          <!--            -->
          <div>
            <UModal v-model="isOpen">
              <UCard
                v-for="(modal, index) in item.modals"
                :key="index"
                :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }"
              >
                <template #header>
                  <!-- Content -->
                  <p class="text-2xl">{{ modal.title }}</p>
                </template>
                <!-- Content -->
                <p>{{ modal.text }}</p>
                <template #footer>
                  <!-- Content -->
                  <p class="text-xs font-light italic text-gray-400 mx-3 flex justify-end">{{ modal.author }}</p>
                </template>
              </UCard>
            </UModal>
          </div>
          <!--            -->
          <UFormGroup label="Kỹ năng của bạn">
            <UInput
              v-model="jobs"
              type="text"
              color="gray"
              variant="outline"
              placeholder="Nhập kỹ năng ở đây"
              size="md"
              class="mt-2"
              @change="validateInput"
            />
          </UFormGroup>
          <span class="text-xs text-red-700">{{ jobsError }}</span>
          <i v-if="!jobsError" class="text-[#5e6d55] dark:text-tertiary-light text-xs"
            ><span class="text-red-700">*</span>Vui lòng nhập kỹ năng</i
          >
        </div>
        <div class="flex justify-center mt-5">
          <UCard
            v-for="(card, index) in item.cards"
            :key="index"
            shadow="never"
            class="w-[341px] h-[300px] rounded-lg dark:bg-secondary"
          >
            <UAvatar size="lg" src="https://avatars.githubusercontent.com/u/739984?v=4" />
            <p class="text-[20px]">{{ card.text }}</p>
            <p class="text-xs font-light italic text-gray-400 mx-3">{{ card.author }}</p>
          </UCard>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
