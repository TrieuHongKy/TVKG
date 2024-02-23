<script setup lang="ts">
import { ref } from 'vue'

interface Button {
  icon: string
  text: string
}
interface Card {
  image?: string
  text: string
  author: string
}
interface ResumeImport {
  id: number
  answer: string
  description: string
  button: Button[]
  cards: Card[]
}
const resume_import = ref<ResumeImport>({
  id: 1,
  answer: 'Hãy cho chúng tôi biết thông tin về bạn !!',
  description:
    'Chúng tôi cần hiểu rõ về trình độ học vấn, kinh nghiệm và kỹ năng của bạn. Nhập thông tin của bạn là nhanh nhất — bạn có thể chỉnh sửa thông tin đó trước khi hồ sơ của bạn hiển thị trực tuyến',
  button: [
    {
      icon: 'i-heroicons-link',
      text: 'Nhập từ Linkedln'
    },
    {
      icon: 'i-heroicons-arrow-up-tray',
      text: 'Tải lên sơ yếu lí lịch của bạn'
    }
  ],
  cards: [
    {
      image: 'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png',
      text: 'Hồ sơ của bạn là cách bạn nổi bật giữa đám đông. Đó là thứ bạn sử dụng để giành được công việc, vì vậy hãy biến nó thành một hồ sơ tốt.',
      author: 'Mẹo chuyên nghiệp của TVKG'
    }
  ]
})

const modal1 = ref(false)

const modal2 = ref(false)

const showModal = (index: number) => {
  if (index === 0) {
    modal1.value = true
  } else if (index === 1) {
    modal2.value = true
  }
}

const emit = defineEmits(['showComponent'])
const showComponent = (componentName: string) => {
  // Gửi sự kiện lên component cha
  emit('showComponent', componentName)
}
</script>

<template>
  <section class="rate flex items-center justify-center">
    <div class="container mx-5">
      <div class="text-[#fffff] flex space-x-2">
        <span>1/10</span>
        <span>Tạo hồ sơ cá nhân</span>
        <span><UIcon name="i-heroicons-clock" /> 5-10 phút</span>
      </div>
      <div class="py-4">
        <div class="text-xl font-medium lg:text-[36px]">{{ resume_import.answer }}</div>
        <div class="lg:text-[16px]">{{ resume_import.description }}</div>
      </div>
      <div class="md:flex md:justify-between justify-center">
        <div class="py-2">
          <!--     Modal 1    -->
          <div class="w-[300px]">
            <UButton
              v-for="(btn, index) in resume_import.button"
              :key="index"
              :ui="{ rounded: 'rounded-full' }"
              color="primary"
              variant="solid"
              class="px-5 mb-5 w-[380px] h-[50px] text-left"
              @click="showModal(index)"
            >
              <UIcon class="text-xl" :name="btn.icon" />
              <span>{{ btn.text }}</span>
            </UButton>
            <UButton
              :ui="{ rounded: 'rounded-full' }"
              class="px-5 w-[380px] h-[50px] text-left"
              color="primary"
              variant="solid"
              icon="i-heroicons-pencil-square"
              @click="showComponent('Title')"
            >
              Điền thủ công
            </UButton>
          </div>
          <div>
            <UModal v-model="modal1">
              <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                <template #header>
                  <!-- Content -->
                  <p>Tải lên hồ sơ LinkedIn của bạn</p>
                </template>
                <!-- Content -->
                <div class="space-y-5">
                  <p>Bước 1: nếu bạn chưa lưu, hãy lưu hồ sơ LinkedIn của bạn dưới dạng PDF. Đây là cách thực hiện:</p>
                  <a
                    href="https://www.linkedin.com/signup/cold-join?session_redirect=https%3A%2F%2Fwww%2Elinkedin%2Ecom%2Fme%2F&trk=login_reg_redirect"
                  >
                    <img src="/images/create-profile/linkedin.png" alt=""
                  /></a>
                  <p>Bước 2: quay lại đây để tải nó lên.</p>
                  <UButton
                    ><label for="upload" class="relative text-center flex items-center justify-center space-x-2">
                      <input id="upload" type="file" class="absolute inset-0 opacity-0 cursor-pointer" />
                      <UIcon name="i-heroicons-arrow-up-on-square" />
                      <span class="">Tải lên bản PDF LinkedIn đã lưu của bạn</span>
                    </label></UButton
                  >
                </div>
                <template #footer>
                  <!-- Content -->
                  <div class="flex justify-end">
                    <UButton color="primary" variant="solid" :ui="{ rounded: 'rounded-full' }">Tiếp tục</UButton>
                  </div>
                </template>
              </UCard>
            </UModal>
          </div>
          <!--     Modal     -->
          <div>
            <UModal v-model="modal2">
              <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                <template #header>
                  <!-- Content -->
                  <p>Thêm sơ yếu lý lịch của bạn</p>
                </template>
                <!-- Content -->
                <div class="space-y-5">
                  <p>
                    Sử dụng tệp PDF, tài liệu Word hoặc tệp văn bản đa dạng thức – đảm bảo tệp có dung lượng từ 5 MB trở
                    xuống.
                  </p>
                  <div class="border border-dashed flex justify-center items-center">
                    <div class="m-10">
                      <UIcon name="i-heroicons-document-text-solid" class="w-[144px] h-[144px] text-primary" />
                    </div>
                    <label for="upload" class="relative text-center flex items-center justify-center space-x-2">
                      <input id="upload" type="file" class="absolute inset-0 opacity-0 cursor-pointer" />
                      <span>Kéo thả hoặc <span class="text-primary">chọn tập tin</span></span>
                    </label>
                  </div>
                </div>
                <template #footer>
                  <!-- Content -->
                  <div class="flex justify-end">
                    <UButton color="primary" variant="solid" :ui="{ rounded: 'rounded-full' }">Tiếp tục</UButton>
                  </div>
                </template>
              </UCard>
            </UModal>
          </div>
        </div>
        <!--          -->
        <!--        -->
        <UCard
          v-for="(card, index) in resume_import.cards"
          :key="index"
          shadow="never"
          class="w-[400px] h-[280px] bg-[#f5f7f0] rounded-lg dark:bg-secondary"
        >
          <UAvatar size="md" :src="card.image" />
          <p class="text-gray-500">{{ card.text }}</p>
          <p class="font-light text-gray-400 flex justify-end">{{ card.author }}</p>
        </UCard>
      </div>
    </div>
  </section>
  <div class="fixed bottom-0 left-0 w-full bg-white dark:bg-theme-dark px-5">
    <div class="sticky bottom-0 bg-[#f2f7f2] mt-5">
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
          @click="showComponent('WorkPreference')"
        >
          Quay lại
        </UButton>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
