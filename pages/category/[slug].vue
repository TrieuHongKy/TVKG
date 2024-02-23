<template>
  <div>
    <div class="flex flex-col gap-4 p-2">
      <div class="">
        <template v-if="isLoading">
          <job-detail-header-loading></job-detail-header-loading>
        </template>
        <template v-else>
          <job-detail-header :job-data="job"></job-detail-header>
        </template>
      </div>
      <div class="flex flex-col sm:flex-row gap-4">
        <div class="w-full sm:w-[60%] md:w-[70%] flex flex-col gap-4">
          <div class="flex flex-col gap-4">
            <div>
              <template v-if="isLoading">
                <job-detail-overview-loading></job-detail-overview-loading>
              </template>
              <template v-else>
                <job-detail-overview :job-data="job"></job-detail-overview>
              </template>
            </div>
            <div>
              <template v-if="isLoading">
                <job-detail-content-loading></job-detail-content-loading>
              </template>
              <template v-else>
                <job-detail-content :job-data="job"></job-detail-content>
              </template>
            </div>
          </div>
          <div class="p-4">
            <template v-if="isLoading">
              <lazy-job-detail-company-jobs></lazy-job-detail-company-jobs>
            </template>
            <template v-else>
              <lazy-job-detail-company-jobs></lazy-job-detail-company-jobs>
            </template>
          </div>
        </div>
        <div class="w-full sm:w-[40%] md:w-[30%] flex flex-col">
          <div class="">
            <template v-if="isLoading">
              <lazy-company-info-loading></lazy-company-info-loading>
            </template>
            <template v-else>
              <lazy-company-info :company-data="job?.company"></lazy-company-info>
            </template>
          </div>
          <div class="">
            <template v-if="isLoading">
              <lazy-job-detail-related-loading></lazy-job-detail-related-loading>
            </template>
            <template v-else>
              <!-- <lazy-job-detail-related :job-related=""></lazy-job-detail-related> -->
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {useJobStore} from '~/stores/job'
import type {Job} from '~/types/job'

export default defineComponent({
  setup() {
    const jobStore = useJobStore()
    const { findJobById } = jobStore
    const { job } = storeToRefs(jobStore)
    const { id } = useRoute().params
    const isLoading = ref<Boolean>(true)
    const relatedJob = ref<Array<Job>>([])

    onMounted(async () => {
      await findJobById(Number(id))
      // await getJobByCate()
      isLoading.value = false
    })

    // const jobDetail = findJobById(Number(id))
    return { id, job, isLoading }
  }
})
</script>

<style scoped></style>
