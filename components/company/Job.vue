<template>
  <div v-if="jobs.length > 0">
    <div
      v-for="job in jobs"
      :key="job.id"
      class="flex flex-col gap-2 justify-center [&:not(:last-child)]:border-b [&:not(:first-child)]:pt-4 [&:not(:last-child)]:pb-4"
    >
      <nuxt-link :to="`/job/${job.id}`">
        <p class="text-lg font-semibold text-green-700 hover:text-primary dark:hover:text-green-700 dark:text-primary">
          {{ job?.job_detail?.title }}
        </p>
      </nuxt-link>
      <div class="grid grid-cols-2 sm:grid-cols-12 gap-2 md:gap-4">
        <div class="flex items-center col-span-1 sm:col-span-2 md:col-span-2">
          <UIcon name="i-heroicons-currency-dollar" class="mr-1 text-primary text-lg flex-shrink-0" />
          <p class="truncate">{{ job?.job_salary?.fixed_salary }} triệu</p>
        </div>
        <div class="flex items-center col-span-1 sm:col-span-2 md:col-span-2">
          <UIcon name="i-heroicons-clock" class="mr-1 text-primary text-lg flex-shrink-0" />
          <p class="truncate">{{ job?.job_attribute?.published_at }}</p>
        </div>
        <div class="flex items-center col-span-2 sm:col-span-5">
          <UIcon name="i-heroicons-map-pin" class="mr-1 text-primary text-lg flex-shrink-0" />
          <p class="truncate">{{ job?.job_detail?.address }}</p>
        </div>
        <div class="flex md:justify-start col-span-2 sm:col-span-3" @click="toggleApplyJob(job as any)">
          <UButton
            :ui="{ rounded: 'rounded-full' }"
            class="px-4 text-xs sm:text-sm"
            :icon="job?.applyJob ? '' : 'i-heroicons-paper-airplane'"
            size="sm"
            :variant="job?.applyJob ? 'solid' : 'outline'"
            color="primary"
            :label="job?.applyJob ? 'Đã ứng tuyển' : 'Ứng tuyển ngay'"
            :disabled="job?.applyJob ? true : false"
          >
          </UButton>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="w-full flex justify-center text-lg text-gray-500 dark:text-gray-300">
    Công ty này hiện chưa tuyển dụng bất kỳ công việc nào
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { Job } from '~/types/job'

export default defineComponent({
  props: {
    jobs: {
      type: Array as PropType<Job[]>,
      default: () => []
    }
  },
  async setup(props) {
    const toastCompany = useToast()

    // const jobStore = useJobStore()
    // const { jobs } = storeToRefs(jobStore)

    const toggleApplyJob = (job: { applyJob: boolean }) => {
      job.applyJob = !job.applyJob
      toastCompany.add({
        title: 'Ứng tuyển thành công',
        icon: 'i-heroicons-check-circle-solid',
        timeout: 2000
      })
    }

    // const { companyId } = props

    // const companyJobs = ref(
    //   jobs.value.filter((job: { id: number; company_id: number }) => job.company_id === companyId)
    // )

    // const loadJobsCompany = async () => {
    //   return new Promise((resolve) => {
    //     setTimeout(() => {
    //       resolve(companyJobs)
    //     }, 500)
    //   })
    // }

    // const jobs = ref<Job[]>((await loadJobsCompany()) as Job[])

    return { toggleApplyJob }
  }
})
</script>

<style scoped></style>
