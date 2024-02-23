<template>
  <div>
    <div class="flex flex-col gap-4 p-2">
      <div class="">
        <template v-if="isLoading">
          <lazy-job-detail-header-loading></lazy-job-detail-header-loading>
        </template>
        <template v-else>
          <lazy-job-detail-header :job-data="job as Job"></lazy-job-detail-header>
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
                <job-detail-overview :job-data="job as Job"></job-detail-overview>
              </template>
            </div>
            <div>
              <template v-if="isLoading">
                <job-detail-content-loading></job-detail-content-loading>
              </template>
              <template v-else>
                <job-detail-content :job-data="job as Job"></job-detail-content>
              </template>
            </div>
          </div>
          <div class="p-4 company__section">
            <template v-if="isLoading">
              <lazy-job-detail-company-jobs :jobs="otherJobs" :company="job?.company"></lazy-job-detail-company-jobs>
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
              <!-- <lazy-job-detail-related-loading></lazy-job-detail-related-loading> -->
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
    const companyStore = useCompanyStore()
    const { jobsByCompany } = storeToRefs(companyStore)
    const { findJobById } = jobStore
    const { job } = storeToRefs(jobStore)
    const { id } = useRoute().params
    const isLoading = ref<Boolean>(true)
    const otherJobs = ref<Array<Job>>([])
    const relatedJob = ref<Array<Job>>([])

    onMounted(async () => {
      await findJobById(Number(id))
      await companyStore.getJobsByCompany(job.value?.company?.id as number)
      otherJobs.value = jobsByCompany.value?.filter((i: Job) => i.id !== job.value?.id)
      isLoading.value = false
    })
    console.log('__ :', otherJobs.value)

    // const jobDetail = findJobById(Number(id))
    return { id, job, isLoading, otherJobs }
  }
})
</script>

<style scoped></style>
