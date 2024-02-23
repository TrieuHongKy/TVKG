<template>
  <div>
    <div class="flex flex-col-reverse md:flex-row gap-4 p-2">
      <template v-if="isLoading">
        <lazy-category-job-loading></lazy-category-job-loading>
      </template>
      <template v-else>
        <lazy-category-job :jobs="jobs" :meta="meta as any"></lazy-category-job>
      </template>
      <!-- <div class="w-full md:w-[25%]">
        <template v-if="isLoading">
          <lazy-job-filter-loading></lazy-job-filter-loading>
        </template>
        <template v-else>
          <lazy-job-filter></lazy-job-filter>
        </template>
      </div> -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    useHead({
      title: 'Danh Sách Việc Làm ',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'Job List',
          name: 'description',
          content: 'my website description'
        }
      ]
    })
    definePageMeta({
      title: 'Jobs List',
      description: 'Jobs List'
    })

    const jobStore = useJobStore()
    const { jobs, meta, isLoading } = storeToRefs(jobStore)

    onMounted(async () => {
      await jobStore.getJobs()
    })

    return {
      jobs,
      meta,
      isLoading
    }
  }
})
</script>

<style scoped></style>
