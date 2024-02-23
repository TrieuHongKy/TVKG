<template>
  <div class="profile-apply-job">
    <div class="mt-6 border border-primary rounded-lg p-2">
      <p class="font-bold py-2 px-2">Công việc tương tự</p>
      <div v-if="companyJobs.length > 0">
        <div
          v-for="job in companyJobs"
          :key="job.id"
          class="flex flex-col gap-2 justify-center p-4 [&:not(:last-child)]:border-b border-primary"
        >
          <nuxt-link
            :to="`/job/${job.id}`"
            class="text-base font-semibold text-green-700 dark:text-primary hover:text-primary dark:hover:text-green-700"
            >{{ job.jobName }}</nuxt-link
          >
          <div class="grid grid-cols-2 gap-2">
            <div class="flex items-center col-span-2 md:col-span-1">
              <UIcon name="i-heroicons-currency-dollar" class="mr-1 text-primary text-lg flex-shrink-0" />
              <p class="truncate">{{ job.salary }} triệu</p>
            </div>
            <div class="flex items-center col-span-2 md:col-span-1">
              <UIcon name="i-heroicons-clock" class="mr-1 text-primary text-lg flex-shrink-0" />
              <p class="truncate">{{ job.date }}</p>
            </div>
            <div class="flex items-center col-span-2">
              <UIcon name="i-heroicons-map-pin" class="mr-1 text-primary text-lg flex-shrink-0" />
              <p class="truncate">{{ job.address }}</p>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="w-full px-2 flex justify-center">
        <p class="text-gray-500 dark:text-gray-300">Công việc này hiện chưa có việc làm liên quan nào</p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {},
  setup(props) {
    // const jobStore = useJobStore()
    // const { jobs } = storeToRefs(jobStore)

    // const { related, jobId } = props

    // const companyJobs = ref(
    //   jobs.value.filter((jobs: { id: number; career: string }) => jobs.career === related && jobs.id !== jobId)
    // )
    return {
      //   jobs,
      //   // id,
      //   companyJobs
    }
  }
})
</script>
<style scoped></style>
