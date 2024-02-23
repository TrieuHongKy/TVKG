<script setup lang="ts">
import { ref } from 'vue'

interface QuestionList {
  id: number
  question: string
  description: string
}
const question_list = ref<QuestionList>({
  id: 1,
  question: 'Đầu tiên, bạn hãy chọn ngành nghề cho bản thân.',
  description:
    'Điều này giúp các doanh nghiệp xác định được ngành nghề hiện tại của bạn, qua đó giúp tăng tỷ lệ xin việc thành công của bạn.'
})
const people = [
  'Wade Cooper',
  'Arlene Mccoy',
  'Devon Webb',
  'Tom Cook',
  'Tanya Fox',
  'Hellen Schmidt',
  'Caroline Schultz',
  'Mason Heaney',
  'Claudie Smitham',
  'Emil Schaefer'
]

const selected = ref(people[-1])
</script>

<template>
  <section class="title flex flex-col items-center justify-center p-4">
    <div class="container mx-5">
      <div class="flex flex-col gap-5">
        <span>2/10</span>
        <h2 class="font-semibold text-2xl">{{ question_list.question }}</h2>
        <p class="text-lg">{{ question_list.description }}</p>
        <div class="w-full sm:w-2/3 md:w-1/2">
          <USelectMenu v-model="selected" :options="people" searchable placeholder="Chọn kỹ năng của bạn">
            <template #option-empty="{ query }">
              <q>{{ query }}</q> not found
            </template>
          </USelectMenu>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
