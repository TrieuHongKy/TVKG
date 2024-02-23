<template>
  <div class="job-detail-heading job__section">
    <div class="company-information flex flex-col sm:flex-row items-center gap-4 sm:gap-8 p-4 relative">
      <div class="logo">
        <img
          :src="job?.company?.company_logo"
          :alt="job?.company?.company_name"
          class="w-[150px] sm:w-[200px] h-auto"
        />
      </div>
      <div class="content flex flex-col items-center sm:items-start z-10">
        <div class="flex flex-col">
          <div class="job-name text-center sm:text-left text-lg font-bold py-2 text-primary">
            {{ job?.job_detail?.title }}
            <UBadge v-if="job?.job_attribute?.is_featured">Nổi bật</UBadge>
          </div>
          <nuxt-link
            :to="`/company/${job?.company?.id}`"
            class="company-name text-center sm:text-left text-lg font-bold py-2 hover:text-primary"
          >
            {{ job?.company?.company_name }}
          </nuxt-link>
          <div class="company-address text-center sm:text-left text-gray-500 dark:text-gray-400">
            {{ job?.ward?.name ? job?.ward?.name + ',' : '' }}
            {{ job?.district?.name ? job?.district?.name + ',' : '' }}
            {{ job?.province?.name ? job?.province?.name : '' }}
          </div>
          <div class="company-other flex flex-col text-center sm:text-left sm:flex-row gap-4 py-2">
            <div>
              <strong>Mức lương:</strong>
              {{ convertToVND(job?.job_salary?.min_salary) }} - {{ convertToVND(job?.job_salary?.max_salary) }}
            </div>
            <div>
              <strong>Hạn nộp hồ sơ:</strong>
              <!-- {{
                new Date(job?.job_attribute?.expired_at + '').toLocaleDateString('vi-VN', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric'
                })
              }} -->
              08/12/2023
            </div>
          </div>
        </div>
        <div class="company-system flex py-2 gap-2">
          <!-- <div>
            <UButton
              color="primary"
              variant="solid"
              :ui="{ rounded: 'rounded-full' }"
              class="px-4"
              label="Nộp hồ sơ"
            ></UButton>
          </div>
          <div>
            <UButton
              color="primary"
              variant="outline"
              :ui="{ rounded: 'rounded-full' }"
              class="px-4"
              label="Lưu tin"
            ></UButton>
          </div> -->
          <UButton
            color="primary"
            variant="solid"
            :ui="{ rounded: 'rounded-full' }"
            class="px-4"
            :icon="applied ? 'i-heroicons-check-solid' : ''"
            :label="applied ? 'Đã nộp hồ sơ' : 'Nộp hồ sơ'"
            :disabled="applied ? true : false"
            @click="applyJob()"
          ></UButton>
          <!-- <UButton
            @click="toggleSavedJobs(job)"
            color="primary"
            variant="outline"
            :ui="{ rounded: 'rounded-full' }"
            class="px-4"
            :icon="job.savedJob ? 'i-heroicons-bookmark-solid' : 'i-heroicons-bookmark'"
            :label="job.savedJob ? 'Đã lưu tin' : 'Lưu tin'"
          ></UButton> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useJobStore } from '~/stores/job'
import type { Job } from '~/types/job'

export default defineComponent({
  props: {
    jobData: {
      type: Object,
      default: () => ({}) as Job
    }
  },
  setup(props) {
    const applyJobStore = useApplyJobStore()
    const profileStore = useProfileStore()
    const messageStore = useMessageStore()
    const { createNewChat } = messageStore
    const { user } = storeToRefs(useAuthStore())
    // const { getCandidateById } = profileStore
    const { profile } = storeToRefs(profileStore)
    const { createApplyJob, alreadyApplied } = applyJobStore
    const { applied } = storeToRefs(applyJobStore)

    onMounted(async () => {
      await profileStore.getCandidateById(user.value?.id as number)
      const jobId = computed(() => props.jobData?.id)
      const req = {
        candidate_id: profile.value?.id,
        job_id: jobId.value
      }
      await alreadyApplied(req)
      console.log('PPPPP: ', profile.value)
    })
    // const { jobData } = props
    const { job } = storeToRefs(useJobStore())

    // const toggleSavedJobs = (job: { savedJob: boolean }) => {
    //   job.savedJob = !job.savedJob
    //   toastJob.add({
    //     title: job.savedJob ? 'Lưu thành công' : 'Bỏ Lưu thành công',
    //     icon: job.savedJob ? 'i-heroicons-check-circle-solid' : 'i-heroicons-x-circle-solid',
    //     timeout: 2000
    //   })
    // }
    const applyJob = async () => {
      const req = {
        candidate_id: profile.value?.id,
        job_id: props.jobData?.id
      }
      const chat = {
        participantIds: [profile.value?.user?.id, job.value?.company?.user?.id],
        name: job.value?.job_detail?.title
      }
      const res = await createApplyJob(req as any)
      if (res) {
        await createNewChat(chat)
      }
    }

    // const jobStore = useJobStore()
    // const findJobById = jobStore.findJobById

    // const job = findJobById(Number(companyId))!

    // const businessDetail = findBusinessById(Number(companyId))!

    return { job, applyJob, applied }
  }
})
</script>

<style scoped></style>
