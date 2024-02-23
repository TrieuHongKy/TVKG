<script setup lang="ts">
import { ref } from 'vue'
import { type Input, maxLength, object, string } from 'valibot'
import type { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'

const schema = object({
  title: string('Vui lòng nhập vui lòng nhập chủ đề', [maxLength(30, '')]),
  company: string('Vui lòng nhập công ty'),
  address: string('Vui lòng nhập địa chỉ')
})
type Schema = Input<typeof schema>
const state = ref({
  title: undefined,
  company: undefined,
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

const list_exp = ref([
  {
    id: 1,
    title: 'Kinh nghiệm PHP',
    company: 'TVKG',
    start_time: '2023-10-20',
    end_time: '2024-10-20',
    descripstion:
      'Đó là điều đầu tiên mà khách hàng nhìn thấy, vì vậy hãy làm cho nó có giá trị. Nổi bật bằng cách mô tả chuyên môn của bạn bằng từ ngữ của riêng bạn'
  }
])
const title = ref([
  {
    title: 'Tiếp theo, hãy mô tả một chút về bản thân bạn.',
    text: 'Mô tả các kinh nghiệm bạn tích lũy được trong quá trình làm việc để nhà tuyển dụng có cái nhìn cụ thể về bạn.'
  }
])
const isOpen = ref(false)

const end_time = ref(new Date())
const end_label = computed(() =>
  end_time.value.toLocaleDateString('en-us', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })
)

const start_time = ref(new Date())
const start_label = computed(() =>
  start_time.value.toLocaleDateString('en-us', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })
)
</script>

<template>
  <!-- Nội dung chính của trang -->
  <section class="employment flex flex-col items-center justify-center p-4">
    <div class="container dark:bg-theme-dark">
      <div class="grid grid-cols-1">
        <div v-for="(item, index) in title" :key="index" class="md:col-span-8 space-y-5">
          <span>3/10</span>
          <h2 class="font-semibold text-2xl">{{ item.title }}</h2>
          <p class="text-lg mt-5">{{ item.text }}</p>
          <UButton
            v-if="list_exp.length === 0"
            label="Open"
            color="none"
            class="w-full h-full md:w-[490px] md:h-[262px] bg-[#f7faf7] col-span-1 mt-10 rounded-md border-dashed border-2 border-gray-300 dark:border-primary dark:border-double dark:border-4 flex justify-center items-center flex-col"
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
            <p class="mt-2 lg:text-[24px] text-[#5e6d55]">Thêm kinh nghiệm</p>
          </UButton>
          <div v-if="list_exp.length > 0" class="grid grid-cols-1 md:grid-cols-4 pt-8">
            <UCard
              v-for="item in list_exp"
              :key="item.id"
              color="none"
              shadow="shadow"
              class="w-full h-auto bg-[#f7faf7] col-start-2 col-span-2 pb-6 px-2"
            >
              <div class="text-gray-500 dark:text-tertiary-light">
                <div class="flex justify-end gap-2">
                  <UButton title="Thêm Kinh Nghiệm" size="lg" @click="isOpen = true">
                    <UIcon name="i-heroicons-document-plus" />
                  </UButton>
                </div>
                <p><b>Tiêu đề:</b> {{ item.title }}</p>
                <p><b>Công ty:</b> {{ item.company }}</p>
                <p><b>Ngày bắt đầu:</b> {{ item.start_time }}</p>
                <p><b>Ngày kết thúc:</b> {{ item.end_time }}</p>
                <p><b>Mô tả:</b> {{ item.descripstion }}</p>
              </div>
            </UCard>
          </div>
          <div>
            <UModal v-model="isOpen">
              <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }" class="">
                <template #header>
                  <!-- Content -->
                  <p class="text-2xl">Thêm Kinh Nghiệm</p>
                </template>
                <!-- Content -->
                <UForm :schema="schema" :state="state" @submit="submit">
                  <UFormGroup label="Tiêu đề" name="title" required>
                    <UInput
                      id="input-label"
                      v-model="state.title"
                      class="mt-2"
                      size="lg"
                      placeholder="Kinh nghiệm PHP"
                      autofocus
                    />
                  </UFormGroup>
                  <UFormGroup label="Công ty" name="company" required>
                    <UInput id="input-label" v-model="state.company" class="mt-2" size="lg" placeholder="TVKG" />
                  </UFormGroup>
                  <UFormGroup label="Vị trí" name="address" class="mb-3">
                    <UInput v-model="state.address" size="lg" class="mt-2" placeholder="Địa chỉ" />
                  </UFormGroup>

                  <UCheckbox v-model="state.isWorking" label="Tôi hiện đang làm việc trong vai trò này" />
                  <div class="flex gap-2 py-5">
                    <UFormGroup label="Ngày bắt đầu" name="start_time">
                      <UPopover v-model="state.start_time" :popper="{ placement: 'bottom-start' }">
                        <UButton icon="i-heroicons-calendar-days-20-solid" :label="start_label" />
                        <template #panel="{ close }">
                          <DatePicker v-model="start_time" @close="close" />
                        </template>
                      </UPopover>
                    </UFormGroup>
                    <UFormGroup v-if="!state.isWorking" label="Ngày kết thúc" end_time>
                      <UPopover v-model="state.end_time" :popper="{ placement: 'bottom-start' }">
                        <UButton icon="i-heroicons-calendar-days-20-solid" :label="end_label" />
                        <template #panel="{ close }">
                          <DatePicker v-model="end_time" @close="close" />
                        </template>
                      </UPopover>
                    </UFormGroup>
                  </div>
                  <UFormGroup label="Mô tả" name="descripstion">
                    <UTextarea
                      v-model="state.descripstion"
                      class="border-gray-200 rounded-md mt-2"
                      :rows="4"
                      size="xl"
                    ></UTextarea>
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
                    <UButton
                      type="submit"
                      :ui="{ rounded: 'rounded-full' }"
                      size="lg"
                      class="px-6"
                      color="primary"
                      variant="solid"
                    >
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
  </section>
</template>

<style scoped></style>
