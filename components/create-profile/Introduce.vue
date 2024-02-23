<script setup lang="ts">
import { defineProps, ref } from 'vue'

interface Stats {
  total: number
  icon: string
}

interface Users {
  id: number
  name: string
  job: string
  stats: Stats[]
  description: string
}

function formatMoney(number: number) {
  if (number >= 1000000000) {
    return number / 1000000000 + 't'
  } else if (number >= 1000000) {
    return number / 1000000 + 'triệu'
  } else {
    return number.toString()
  }
}

const users = ref<Users[]>([
  {
    id: 1,
    name: 'Thien Nhan',
    job: 'Nhà phát triển trang web',
    stats: [
      {
        icon: 'i-heroicons-star',
        total: 5
      },
      {
        icon: 'i-heroicons-currency-dollar',
        total: 200000000
      },
      {
        icon: 'i-heroicons-briefcase',
        total: 35
      }
    ],
    description:
      '"Tìm Việc Kiên Giang đã cho phép tôi tăng tỷ lệ của mình. Tôi biết mình đang mang đến điều gì và yêu thích cảm giác có thể giúp đỡ nhiều khách hàng khác nhau."'
  }
])
const intro_right = ref([
  {
    title: 'Trả lời một số câu hỏi và bắt đầu xây dựng hồ sơ của bạn',
    icon: 'i-heroicons-user'
  },
  {
    title: 'Không mất quá nhiều thời gian khi tìm kiếm công việc',
    icon: 'i-heroicons-inbox'
  },
  {
    title: 'Tìm kiếm những công việc phù hợp và dễ dàng',
    icon: 'i-heroicons-currency-dollar'
  }
])
const intro_bottom = ref('Chỉ mất 5-10 phút. Chúng tôi sẽ tối ưu thời gian tìm việc của bạn một cách nhanh nhất.')

const { goNext }: any = defineProps(['goNext'])
</script>

<template>
  <section class="introduce flex items-center justify-center dark:bg-theme-dark p-4">
    <div class="container">
      <div class="grid grid-cols-1 md:grid-cols-12">
        <!-- Content for the left column -->
        <div class="col-span-7">
          <div class="lg:space-y-5">
            <h1 class="text-xl py-5 lg:text-4xl font-bold dark:text-tertiary-light">
              Bạn đã sẵn sàng cho cơ hội lớn tiếp theo của bạn chưa?
            </h1>
            <div v-for="item in intro_right" :key="item.title" class="text-base flex items-center">
              <UIcon :name="item.icon" size="lg" />
              <span class="p-2 dark:text-tertiary-light">{{ item.title }}</span>
            </div>
            <div class="py-5">
              <UButton
                :ui="{ rounded: 'rounded-full' }"
                size="lg"
                class="px-6"
                color="primary"
                variant="solid"
                @click="goNext"
                >Bắt đầu</UButton
              >
            </div>
            <span class="text-xs lg:text-sm dark:text-tertiary-light">{{ intro_bottom }}</span>
          </div>
        </div>
        <!-- Content for the right column -->
        <div class="col-span-5 px-0 md:px-4 flex items-center justify-center">
          <UCard
            v-for="item in users"
            :key="item.id"
            shadow="never"
            class="rounded-lg w-full mt-4 md:w-[480px] md:h-[350px] dark:bg-secondary"
          >
            <div class="flex flex-col items-center space-y-2">
              <img src="https://avatars.githubusercontent.com/u/739984?v=4" alt="" class="rounded-full w-28 h-28" />
              <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-tertiary-light">{{ item.name }}</h5>
              <span class="text-sm">{{ item.job }}</span>

              <div class="flex py-2">
                <div class="flex items-center space-x-1">
                  <div v-for="(stat, index) in item.stats" :key="index" class="flex content-center items-center pl-2">
                    <UIcon :name="stat.icon" />
                    <p class="text-center">{{ formatMoney(stat.total) }}</p>
                  </div>
                </div>
              </div>
              <p class="font-medium">
                {{ item.description }}
              </p>
            </div>
          </UCard>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped></style>
