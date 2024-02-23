<template>
  <div class="flex flex-col gap-4">
    <search-bar></search-bar>
    <div class="p-2">
      <div class="flex flex-col gap-6 md:flex-row">
        <div class="w-full md:w-[70%]">
          <template v-if="isLoading">
            <job-item-special-loading></job-item-special-loading>
          </template>
          <template v-else>
            <job-item-special :company-with-jobs="companies" :meta="meta"></job-item-special>
          </template>
        </div>
        <div class="w-full md:w-[30%]">
          <template v-if="isLoading">
            <job-item-new-loading></job-item-new-loading>
          </template>
          <template v-else>
            <job-item-new :job-data="jobs"></job-item-new>
          </template>
        </div>
      </div>
    </div>
    <category-featured-list></category-featured-list>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useJobStore } from '~/stores/job'

export default defineComponent({
  name: 'UserHomePage',
  setup() {
    useHead({
      title: 'Trang chủ',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content: 'User homepage website'
        }
      ]
    })

    const jobStore = useJobStore()
    const companyStore = useCompanyStore()
    const { getJobs } = jobStore
    const { getCompanyWithJobs } = companyStore
    const { companies, meta, isLoading } = storeToRefs(companyStore)
    const { jobs } = storeToRefs(jobStore)

    onMounted(async () => {
      await getJobs()
      await getCompanyWithJobs()
    })

    return { jobs, meta, companies, isLoading }
  }
})
</script>
<style scoped></style>
