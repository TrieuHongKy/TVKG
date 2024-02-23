<template>
  <div v-for="(job, index) in jobs" :key="job.id" :class="style(index)" class="flex flex-col gap-2 justify-center">
    <nuxt-link to="/">
      <p
        class="text-lg font-semibold text-green-700 hover:text-primary dark:hover:text-tertiary-light dark:text-primary"
      >
        {{ job.name }}
      </p>
    </nuxt-link>
    <div class="grid grid-cols-2 sm:grid-cols-12 gap-2 md:gap-4">
      <div class="flex items-center col-span-1 sm:col-span-2 md:col-span-2">
        <UIcon name="i-heroicons-currency-dollar" class="mr-1 text-primary text-lg flex-shrink-0" />
        <p class="truncate">{{ job.minSalary }}-{{ job.maxSalary }} triệu</p>
      </div>
      <div class="flex items-center col-span-1 sm:col-span-2 md:col-span-2">
        <UIcon name="i-heroicons-clock" class="mr-1 text-primary text-lg flex-shrink-0" />
        <p class="truncate">{{ job.date }}</p>
      </div>
      <div class="flex items-center col-span-2 sm:col-span-8">
        <UIcon name="i-heroicons-map-pin" class="mr-1 text-primary text-lg flex-shrink-0" />
        <p class="truncate">{{ job.address }}</p>
      </div>
      <div class="flex md:justify-start col-span-2 sm:col-span-3">
        <UButton
          :ui="{ rounded: 'rounded-full' }"
          class="px-4 text-xs sm:text-sm"
          icon="i-heroicons-paper-airplane"
          size="sm"
          variant="outline"
          color="primary"
          >Ứng tuyển ngay
        </UButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

const loadJobsCompany = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: 'PHÓ GIÁM ĐỐC KINH DOANH',
          minSalary: '7',
          maxSalary: '15',
          date: '31/10/2023',
          address: 'Cần Thơ, Vĩnh Long, An Giang, Hậu Giang, Kiên Giang'
        },
        {
          id: 2,
          name: 'PHÓ GIÁM ĐỐC KINH DOANH',
          minSalary: '7',
          maxSalary: '15',
          date: '31/10/2023',
          address: 'Cần Thơ, Vĩnh Long, An Giang, Hậu Giang, Kiên Giang'
        },
        {
          id: 3,
          name: 'PHÓ GIÁM ĐỐC KINH DOANH',
          minSalary: '7',
          maxSalary: '15',
          date: '31/10/2023',
          address: 'Cần Thơ, Vĩnh Long, An Giang, Hậu Giang, Kiên Giang'
        },
        {
          id: 4,
          name: 'PHÓ GIÁM ĐỐC KINH DOANH',
          minSalary: '7',
          maxSalary: '15',
          date: '31/10/2023',
          address: 'Cần Thơ, Vĩnh Long, An Giang, Hậu Giang, Kiên Giang'
        },
        {
          id: 5,
          name: 'PHÓ GIÁM ĐỐC KINH DOANH',
          minSalary: '7',
          maxSalary: '15',
          date: '31/10/2023',
          address: 'Cần Thơ, Vĩnh Long, An Giang, Hậu Giang, Kiên Giang'
        },
        {
          id: 6,
          name: 'PHÓ GIÁM ĐỐC KINH DOANH',
          minSalary: '7',
          maxSalary: '15',
          date: '31/10/2023',
          address: 'Cần Thơ, Vĩnh Long, An Giang, Hậu Giang, Kiên Giang'
        }
      ])
    }, 500)
  })
}

interface Job {
  id: number
  name: string
  minSalary: string
  maxSalary: string
  date: string
  address: string
}

export default defineComponent({
  async setup() {
    const jobs = ref<Job[]>((await loadJobsCompany()) as Job[])

    const style = (index: number) => {
      if (index == jobs.value.length - 1) {
        return []
      } else {
        return ['border-b', 'pb-4']
      }
    }
    return { jobs, style }
  }
})
</script>

<style scoped></style>
