<template>
  <div class="flex flex-col gap-6">
    <p class="text-lg font-semibold">Việc Làm Cùng Công Ty</p>
    <div v-if="companyJobs.length > 0" class="flex flex-col gap-4 p-2">
      <div v-for="(job, index) in companyJobs" :key="index" class="jobDetail__companyJobs--card">
        <p>
          <nuxt-link :to="`/job/${job.id}`" class="jobDetail__companyJobs--jobName">{{ job.jobName }}</nuxt-link>
        </p>
        <p class="pt-2">
          <nuxt-link
            to="../../company"
            class="text-gray-500 dark:text-gray-300 dark:hover:text-primary hover:text-green-700"
            >{{ job.companyName }}</nuxt-link
          >
        </p>

        <div class="grid grid-cols-2 md:grid-cols-12 gap-2 pt-4 md:gap-4">
          <div class="jobDetail__companyJobs--item col-span-1 md:col-span-3">
            <UIcon name="i-heroicons-currency-dollar" class="jobDetail__companyJobs--icon" />
            <p class="truncate">{{ job.salary }} triệu</p>
          </div>
          <div class="jobDetail__companyJobs--item col-span-1 md:col-span-3">
            <UIcon name="i-heroicons-clock" class="jobDetail__companyJobs--icon" />
            <p class="truncate">{{ job.date }}</p>
          </div>
          <div class="jobDetail__companyJobs--item col-span-2 md:col-span-6">
            <UIcon name="i-heroicons-map-pin" class="jobDetail__companyJobs--icon" />
            <p class="truncate">{{ job.address }}</p>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="w-full flex justify-center">
      <p class="text-gray-500 dark:text-gray-300">Hiện công ty này chưa tuyển thêm bất kỳ công việc nào</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useJobStore } from '~/stores/job'

export default defineComponent({
  props: {
    companyId: {
      type: Number,
      default: null
    },
    jobId: {
      type: Number,
      default: null
    }
  },
  setup(props) {
    const jobStore = useJobStore()
    const { jobs } = storeToRefs(jobStore)

    const { jobId, companyId } = props

    const companyJobs = ref(
      jobs.value.filter((job: { id: number; company_id: number }) => job.company_id === companyId && job.id !== jobId)
    )
    return { jobs, companyJobs }
  }
})
</script>

<style scoped>
.jobDetail__companyJobs--card {
  @apply flex flex-col justify-center [&:not(:last-child)]:border-b pb-4 border-primary;
}
.jobDetail__companyJobs--jobName {
  @apply text-lg font-semibold hover:text-primary text-green-700 dark:hover:text-green-700 dark:text-primary;
}
.jobDetail__companyJobs--icon {
  @apply mr-1 text-primary text-lg flex-shrink-0;
}
.jobDetail__companyJobs--item {
  @apply flex items-center cursor-default;
}
</style>
