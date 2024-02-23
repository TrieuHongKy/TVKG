<script setup lang="ts">
import { ref } from 'vue'
import { type Input, object, string } from 'valibot'
import type { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'

const schema = object({
  school: string('Vui lòng nhập trường'),
  majors: string('Vui lòng nhập chuyên ngành'),
  address: string('Vui lòng nhập địa chỉ')
})
type Schema = Input<typeof schema>
const state = ref({
  school: undefined,
  majors: undefined,
  address: undefined,
  isWorking: false,
  start_time: undefined,
  end_time: undefined,
  descripstion: undefined
})

async function submit(event: FormSubmitEvent<Schema>) {
  // Do something with event.data
  console.log(event.data)
}

const list_education = ref([
  {
    id: 1,
    school: 'Cao đẳng FPOLY',
    majors: 'Desgin',
    start_time: '2023-10-20',
    end_time: '2024-10-20',
    descripstion:
      'Đó là điều đầu tiên mà khách hàng nhìn thấy, vì vậy hãy làm cho nó có giá trị. Nổi bật bằng cách mô tả chuyên môn của bạn bằng từ ngữ của riêng bạn'
  }
])
const title = ref([
  {
    title: 'Khách hàng muốn biết những gì bạn có - hãy thêm trình độ học vấn của bạn.',
    text: 'Bạn không cần phải có bằng cấp. Thêm bất kỳ giáo dục có liên quan nào giúp làm cho hồ sơ của bạn trở nên tuyệt vời hơn.'
  }
])
const end_time = ref(new Date())
const end_label = computed(() =>
  end_time.value.toLocaleDateString('en-us', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })
)

const start_time = ref(new Date())
const start_label = computed(() =>
  start_time.value.toLocaleDateString('en-us', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })
)

const isOpen = ref(false)
</script>

<template>
  <!-- Nội dung chính của trang -->
  <section class="education flex flex-col items-center justify-center p-4">
    <div class="container dark:bg-theme-dark">
      <div class="grid grid-cols-1">
        <div v-for="(item, index) in title" :key="index" class="md:col-span-8 space-y-5">
          <span>4/10</span>
          <h2 class="font-semibold text-2xl">{{ item.title }}</h2>
          <p class="text-lg lg:text-[16px] mt-5">{{ item.text }}</p>
          <UButton
            v-if="list_education.length === 0"
            color="none"
            label="Open"
            class="w-full h-full md:w-[490px] md:h-[262px] bg-[#f7faf7] flex flex-col justify-center items-center mt-10 rounded-md border-dashed border-2 border-gray-300 dark:border-primary dark:border-double dark:border-4"
            @click="isOpen = true"
          >
            <span
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                style="fill: rgba(20 168 0 / var(--tw-bg-opacity))"
              >
                <path d="M11 10H9v3H6v2h3v3h2v-3h3v-2h-3z"></path>
                <path
                  d="M4 22h12c1.103 0 2-.897 2-2V8c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2zM4 8h12l.002 12H4V8z"
                ></path>
                <path d="M20 2H8v2h12v12h2V4c0-1.103-.897-2-2-2z"></path></svg
            ></span>
            <p class="mt-2 lg:text-[24px] text-[#5e6d55]">Thêm giáo dục</p>
          </UButton>
          <div v-if="list_education.length > 0" class="grid grid-cols-1 md:grid-cols-5 pt-8">
            <UCard
              v-for="item in list_education"
              :key="item.id"
              class="w-full h-auto bg-[#f7faf7] col-span-3 col-start-2 px-2 pb-6"
            >
              <div class="text-gray-500 dark:text-tertiary-light">
                <div class="flex justify-end">
                  <UButton title="Thêm Giáo Dục" size="lg" @click="isOpen = true">
                    <UIcon name="i-heroicons-document-plus" />
                  </UButton>
                </div>
                <p><b>Trường:</b> {{ item.school }}</p>
                <p><b>Chuyên ngành:</b> {{ item.majors }}</p>
                <p><b>Ngày bắt đầu:</b> {{ item.start_time }}</p>
                <p><b>Ngày kết thúc:</b> {{ item.end_time }}</p>
                <p><b>Mô tả:</b> {{ item.descripstion }}</p>
              </div>
            </UCard>
          </div>
          <div>
            <!--          -->
            <div>
              <UModal v-model="isOpen">
                <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }" class="">
                  <template #header>
                    <!-- Content -->
                    <p class="text-2xl">Thêm Giáo Dục</p>
                  </template>
                  <!-- Content -->
                  <UForm :schema="schema" :state="state" @submit="submit">
                    <UFormGroup label="Trường" name="school" required>
                      <UInput
                        id="input-label"
                        v-model="state.school"
                        class="mt-2"
                        size="lg"
                        placeholder="CD FPT"
                        autofocus
                      />
                    </UFormGroup>
                    <UFormGroup label="Chuyên ngành" name="majors" required>
                      <UInput
                        id="input-label"
                        v-model="state.majors"
                        class="mt-2"
                        size="lg"
                        placeholder="Thiết kế trang web"
                      />
                    </UFormGroup>
                    <UFormGroup label="Vị trí" name="address" class="mb-3">
                      <UInput v-model="state.address" size="lg" class="mt-2" placeholder="Địa chỉ" />
                    </UFormGroup>
                    <UCheckbox v-model="state.isWorking" label="Tôi hiện đang làm việc trong vai trò này" />
                    <div class="flex gap-2 py-5">
                      <UFormGroup label="Ngày bắt đầu">
                        <UPopover v-model="state.start_time" :popper="{ placement: 'bottom-start' }">
                          <UButton icon="i-heroicons-calendar-days-20-solid" :label="start_label" />
                          <template #panel="{ close }">
                            <DatePicker v-model="start_time" @close="close" />
                          </template>
                        </UPopover>
                      </UFormGroup>
                      <UFormGroup v-if="!state.isWorking" label="Ngày kết thúc">
                        <UPopover v-model="state.end_time" :popper="{ placement: 'bottom-start' }">
                          <UButton icon="i-heroicons-calendar-days-20-solid" :label="end_label" />
                          <template #panel="{ close }">
                            <DatePicker v-model="end_time" @close="close" />
                          </template>
                        </UPopover>
                      </UFormGroup>
                    </div>
                    <UFormGroup v-model="state.descripstion" label="Mô tả">
                      <UTextarea class="border-gray-200 rounded-md mt-2" :rows="4" size="xl"></UTextarea>
                    </UFormGroup>
                  </UForm>
                  <template #footer>
                    <!-- Content -->
                    <div class="flex justify-end items-center gap-4 py-3 px-4 dark:border-gray-700">
                      <UButton
                        :ui="{ rounded: 'rounded-full' }"
                        size="lg"
                        color="primary"
                        variant="outline"
                        class="px-6"
                        @click="isOpen = false"
                      >
                        Huỷ bỏ
                      </UButton>
                      <UButton :ui="{ rounded: 'rounded-full' }" size="lg" class="px-6" color="primary" variant="solid">
                        Lưu
                      </UButton>
                    </div>
                  </template>
                </UCard>
              </UModal>
            </div>
            <!--          -->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
