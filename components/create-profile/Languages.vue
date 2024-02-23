<script setup lang="ts">
import { ref } from 'vue'

const title = {
  title: 'Trông được. Tiếp theo, hãy cho chúng tôi biết bạn nói ngôn ngữ nào.',
  text: 'Upwork mang tính toàn cầu, vì vậy khách hàng thường muốn biết bạn nói ngôn ngữ nào. Tiếng Anh là bắt buộc, nhưng bạn có nói được ngôn ngữ nào khác không?'
}

const levelOption = [
  {
    id: 1,
    level: 'Tôi đọc hiểu ngôn ngữ này'
  },
  {
    id: 2,
    level: 'Tôi viết ,đọc hiểu ngôn ngữ này'
  },
  {
    id: 3,
    level: 'Tôi nghe, viết , đọc hiểu  ngôn ngữ này'
  },
  {
    id: 4,
    level: ' Tôi nghe, nói, đọc ,viết được ngôn ngữ này '
  }
]
let selectedLevel = ref('2')
const languages = ref<Array<{ name: string; level: string; showDeleteButton: boolean }>>([])

const ownLanguage = ref([
  {
    id: 1,
    language: 'Nhật'
  },
  {
    id: 2,
    language: 'Trung Quốc'
  },
  {
    id: 3,
    language: 'Pháp'
  },
  {
    id: 4,
    language: 'Ý'
  }
])

const addLanguage = () => {
  languages.value.push({
    name: 'Trung Quốc',
    level: '2',
    showDeleteButton: true
  })
}

const removeLanguage = (index: number) => {
  languages.value.splice(index, 1)
}
const emit = defineEmits(['showComponent'])
const showComponent = (componentName: string) => {
  // Gửi sự kiện lên component cha
  emit('showComponent', componentName)
}
</script>

<template>
  <section class="languages flex flex-col items-center justify-center p-4">
    <div class="container mx-autodark:bg-theme-dark">
      <div class="grid grid-cols-1 lg:grid-cols-10">
        <div class="md:col-span-8 space-y-5">
          <span>5/10</span>
          <div class="space-y-5">
            <h2 class="font-medium lg:text-[30px] leading-tight">{{ title.title }}</h2>
            <p class="text-xs lg:text-[16px] mt-5 leading-relaxed">{{ title.text }}</p>
          </div>
          <table class="min-w-full divide-y divide-gray-200 dark:divide-y-gray-700 mt-10">
            <thead>
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xl">Ngôn ngữ</th>
                <th scope="col" class="px-6 py-3 text-left text-xl">Khả năng</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-xl font-medium text-[#5e6d55] dark:text-tertiary-light">
                  Tiếng Anh
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-xl text-gray-800 dark:text-gray-200">
                  <USelect
                    v-model="selectedLevel"
                    size="lg"
                    :options="levelOption"
                    value-attribute="id"
                    option-attribute="level"
                  />
                </td>
              </tr>
              <tr v-for="(language, index) in languages" :key="index">
                <td class="px-6 py-4 whitespace-nowrap text-xs font-medium dark:text-tertiary-light">
                  <USelect v-model="languages[index].name" :options="ownLanguage" option-attribute="language" />
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-xs text-gray-800 dark:text-gray-200 break-keep">
                  <USelect
                    v-model="languages[index].level"
                    :options="levelOption"
                    value-attribute="id"
                    option-attribute="level"
                  />
                </td>
                <td class="px-6 py-4">
                  <UButton
                    v-if="language.showDeleteButton"
                    class="border-none lg:text-4xl"
                    icon="i-heroicons-trash"
                    @click="removeLanguage(index)"
                  >
                  </UButton>
                </td>
              </tr>
            </tbody>
          </table>
          <UButton
            :ui="{ rounded: 'rounded-full' }"
            size="md"
            color="primary"
            icon="i-heroicons-plus"
            @click="addLanguage"
            >Thêm ngôn ngữ</UButton
          >
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped></style>
