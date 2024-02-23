<template>
  <div class="item__special">
    <div class="special--label flex flex-row items-center gap-1 pb-4">
      <UIcon name="i-heroicons-star-solid" class="text-2xl text-primary dark:text-green-700" />
      <p class="text-lg font-semibold text-green-800 dark:text-primary">CÔNG TY NỔI BẬT</p>
    </div>
    <div class="flex flex-col gap-4">
      <div
        v-for="company in companyWithJobs as Array<CompanyWithJob>"
        :key="company?.id"
        class="special--card rounded-xl sm:px-2 p-2 md:p-4 shadow-md hover:shadow-lg dark:bg-gray-700 dark:hover:bg-gray-600 cursor-pointer company__section"
      >
        <div class="special--company flex w-full gap-2 md:gap-4">
          <nuxt-link
            :to="`company/${company?.slug}`"
            class="company--avatar flex items-center justify-center min-w-[80px] max-w-[120px]"
          >
            <img
              :src="company?.company_logo"
              :alt="company?.company_name"
              class="w-[80px] sm:w-[100px] md:w-[120px] object-cover"
            />
          </nuxt-link>
          <div class="company--infor flex flex-col w-full basis-full sm:gap-2 py-2">
            <nuxt-link :to="`company/${company?.slug}`">
              <p
                class="infor--company text-green-600 hover:text-primary text-base sm:text-xl font-semibold dark:hover:text-primary dark:text-green-600 line-clamp-1"
              >
                {{ company?.company_name }}
              </p>
            </nuxt-link>
            <p class="infor--address text-gray-400 dark:text-gray-300 font-base text-base sm:text-lg line-clamp-1">
              {{ company?.company_address }}
              {{ company?.address?.ward?.name ? company?.address?.ward?.name + ',' : '' }}
              {{ company?.address?.district?.name ? company?.address?.district?.name + ',' : '' }}
              {{ company?.address?.province?.name ? company?.address?.province?.name : '' }}
            </p>
            <div class="infor--description grid grid-cols-12">
              <div class="flex gap-1 items-center col-span-6 sm:col-span-2">
                <div class="flex items-center">
                  <UIcon
                    name="i-heroicons-user-group-solid"
                    class="infor--icon dark:text-green-600 text-green-600 text-lg my-auto mx-0"
                  />
                </div>
                <p class="infor--value text-base sm:text-lg">
                  {{ company?.company_size }}
                </p>
              </div>
              <div class="flex items-center gap-1 col-span-6 sm:col-span-5">
                <div class="flex items-center">
                  <UIcon name="i-heroicons-briefcase-solid" class="infor--icon text-green-600 text-lg my-auto mx-0" />
                </div>
                <p class="infor--value text-base sm:text-lg">
                  {{ company?.company_industry }}
                </p>
              </div>
              <div class="hidden sm:flex items-center gap-1 col-span-12 sm:col-span-5">
                <div class="flex items-center">
                  <UIcon
                    name="i-heroicons-building-office-solid"
                    class="infor--icon text-green-600 text-lg my-auto mx-0"
                  />
                </div>
                <p class="infor--value text-base sm:text-lg line-clamp-1">
                  {{ company?.company_type }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="special--list">
          <div
            v-for="job in company.jobs as Array<Job>"
            :key="job?.id"
            class="special--card [&:not(:last-child)]:border-b dark:border-gray-400 grid grid-cols-12 md:flex md:flex-row"
          >
            <nuxt-link
              :to="`job/${job?.id}`"
              class="col-span-12 md:w-[60%] text-base text-green-700 dark:text-primary hover:text-primary dark:hover:text-green-600 p-2"
              ><p>{{ job?.job_detail?.title }}</p></nuxt-link
            >
            <div class="description col-span-12 grid-col-12 md:w-[40%] justify-between flex flex-row">
              <div class="col-span-4 flex items-center gap-1 sm:gap-2">
                <UIcon name="i-heroicons-currency-dollar-solid" class="infor--icon text-green-600 text-lg" />
                <p class="infor--value text-sm md:text-base">{{ convertToVND(job?.job_salary?.fixed_salary) }}</p>
              </div>
              <div class="col-span-4 flex items-center gap-1 sm:gap-2">
                <UIcon name="i-heroicons-clock-solid" class="infor--icon text-green-600 text-lg my-auto mx-0" />
                <p class="infor--value text-sm md:text-base">
                  {{
                    timeUntil(new Date(job?.job_attribute?.expired_at)).days > 0
                      ? 'Còn lại ' + timeUntil(new Date(job?.job_attribute?.expired_at)).days + ' ngày'
                      : 'Đã hết hạn'
                  }}
                </p>
              </div>
              <div class="post__detail--like items-center col-span-4 flex flex-row">
                <!-- <UIcon
                  :name="job ? 'i-heroicons-bookmark-solid' : 'i-heroicons-bookmark'"
                  class="cursor-pointer text-3xl"
                  :class="job ? 'text-green-600' : 'text-tertiary/60 dark:text-tertiary-light/60'"
                /> -->
                <UIcon
                  v-if="!job.isLiked"
                  name="i-heroicons-bookmark-solid"
                  class="cursor-pointer text-3xl"
                  @click="toggleSavedJob(job.id)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <UPagination v-model="curr_page" size="md" :page-count="meta?.per_page" :total="meta?.total" />
    </div>
  </div>
</template>
<script lang="ts">
import type { Company as CompanyWithJob } from '~/types/company'
import type { Meta } from '~/types/meta'
import type { Job } from '~/types/job'

export default defineComponent({
  name: 'JobSpecial',
  props: {
    companyWithJobs: {
      type: Array as PropType<CompanyWithJob[]>,
      default: null
    },
    meta: {
      type: Object as PropType<Meta>,
      default: null
    }
  },
  setup(props) {
    const toastJob = useToast()

    const jobStore = useJobStore()
    const { jobs } = storeToRefs(jobStore)
    const { savedJob, checkSavedJob, getJobs, getJobsAndCheckSaved } = jobStore
    const authStore = useAuthStore()
    const { user } = storeToRefs(authStore)
    const candidate_id = user.value?.id

    const curr_page = ref(1)
    const companyStore = useCompanyStore()

    onMounted(async () => {
      await getJobs()
      await getJobsAndCheckSaved(candidate_id as any)
    })

    // const toggleSavedJob = (job: { savedJob: boolean }) => {
    //   job.savedJob = !job.savedJob
    //   toastJob.add({
    //     title: job.savedJob ? 'Lưu thành công' : 'Bỏ Lưu thành công',
    //     icon: job.savedJob ? 'i-heroicons-check-circle-solid' : 'i-heroicons-x-circle-solid',
    //     timeout: 2000
    //   })
    // }

    const toggleSavedJob = async (job_id: any) => {
      await savedJob(candidate_id, job_id)
      const job = jobs.find((job: any) => job.id === job_id)
      if (job.id === job_id) {
        job.isLiked = !job.isLiked
        job.likes = job.isLiked ? job.likes + 1 : job.likes - 1
        console.log('aaaaaaaaaa')
      }
      console.log('bbbbbbb')
    }

    watch(curr_page, async (value) => {
      await companyStore.paginateCompanies(value)
    })

    return { toggleSavedJob, curr_page }
  }
})
</script>
<style scoped></style>
