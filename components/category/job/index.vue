<template>
  <div class="w-full">
    <div class="min-h-[725px] sm:min-h-[773px] md:min-h-[867px]">
      <div class="flex flex-col gap-4 p-4">
        <p class="text-sm font-semibold flex items-center gap-1">
          <UIcon name="i-heroicons-briefcase" class="text-base"></UIcon>
          Đã tìm thấy {{ jobs?.length }} trong {{ meta?.total }} việc làm
        </p>
        <div v-for="jobDetail in jobs" :key="jobDetail.id" class="col-span-1 bg-card dark:bg-card-dark ct-card">
          <nuxt-link :to="'/job/' + jobDetail?.id" class="flex flex-row sm:px-2 w-full gap-2 md:gap-4 p-2 md:p-4">
            <nuxt-link :to="`/job/${jobDetail?.company?.id}`" class="flex items-center justify-center">
              <img
                :src="jobDetail?.company?.company_logo"
                :alt="jobDetail?.company?.company_name"
                class="w-[60px] sm:w-[100px] md:w-[120px] object-cover"
              />
            </nuxt-link>
            <div class="flex flex-col justify-center sm:gap-2 w-full">
              <nuxt-link
                :to="`/job/${jobDetail.id}`"
                class="line-clamp-1 text-green-600 hover:text-primary text-base sm:text-xl font-semibold"
                >{{ jobDetail?.job_detail?.title }}</nuxt-link
              >
              <div class="flex items-center justify-between w-full">
                <nuxt-link
                  :to="`/company/${jobDetail?.company?.slug}`"
                  class="line-clamp-1 hover:text-primary text-base md:text-xl"
                  >{{ jobDetail?.company?.company_name }}</nuxt-link
                >
                <!-- <UIcon
                  :name="jobDetail.savedJob ? 'i-heroicons-bookmark-solid' : 'i-heroicons-bookmark'"
                  class="hidden md:block cursor-pointer text-3xl"
                  :class="jobDetail.savedJob ? 'text-green-600' : 'text-tertiary/60 dark:text-tertiary-light/60'"
                  @click="toggleSavedJob(jobDetail)"
                /> -->
              </div>
              <div class="grid grid-cols-12 gap-0 sm:gap-4">
                <div class="flex flex-row gap-1 items-center col-span-5 md:col-span-3">
                  <div class="flex">
                    <UIcon class="text-primary text-lg" name="i-heroicons-currency-dollar-solid" />
                  </div>
                  <p class="text-sm md:text-lg">
                    {{ convertToVND(jobDetail?.job_salary?.fixed_salary) }}
                  </p>
                </div>
                <div class="flex flex-row gap-1 items-center col-span-6 md:col-span-3">
                  <div class="flex"><UIcon class="text-primary text-lg" name="i-heroicons-clock-solid" /></div>
                  <p class="text-sm md:text-lg">
                    {{
                      new Date(jobDetail?.job_attribute?.expired_at + '').toLocaleDateString('vi-VN', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                      })
                    }}
                  </p>
                </div>
                <div class="flex flex-row md:hidden gap-1 items-center col-span-1">
                  <!-- <UIcon
                    :name="jobDetail.savedJob ? 'i-heroicons-bookmark-solid' : 'i-heroicons-bookmark'"
                    class="cursor-pointer text-3xl"
                    :class="jobDetail.savedJob ? 'text-green-600' : 'text-tertiary/60 dark:text-tertiary-light/60'"
                    @click="toggleSavedJob"
                  /> -->
                </div>
                <div class="hidden md:flex flex-row gap-1 items-center col-span-6">
                  <div class="flex"><UIcon name="i-heroicons-map-pin-solid" class="text-primary text-lg" /></div>
                  <p class="truncate text-lg">
                    {{ jobDetail?.ward?.name ? jobDetail?.ward?.name + ',' : '' }}
                    {{ jobDetail?.district?.name ? jobDetail?.district?.name + ',' : '' }}
                    {{ jobDetail?.province?.name ? jobDetail?.province?.name : '' }}
                  </p>
                </div>
              </div>
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>
    <div class="flex justify-center pt-4">
      <UPagination v-model="curr_page" size="md" :page-count="meta?.per_page" :total="meta?.total" />
    </div>
  </div>
</template>

<script lang="ts">
import type { Job } from '~/types/job'
import type { Meta } from '~/types/meta'

export default defineComponent({
  props: {
    jobs: {
      type: Array as PropType<Job[]>,
      required: true
    },
    meta: {
      type: Object as PropType<Meta>,
      required: true
    }
  },
  setup(props) {
    const toastJob = useToast()
    const { meta } = props
    const curr_page = ref()
    const paginateJobs = useJobStore().paginateJobs

    onMounted(async () => {
      curr_page.value = meta.current_page
    })

    watch(curr_page, async (value) => {
      await paginateJobs(value)
    })

    // const toggleSavedJob = (jobDetail: { savedJob: boolean }) => {
    //   jobDetail.savedJob = !jobDetail.savedJob
    //   toastJob.add({
    //     title: jobDetail.savedJob ? 'Lưu thành công' : 'Bỏ Lưu thành công',
    //     icon: jobDetail.savedJob ? 'i-heroicons-check-circle-solid' : 'i-heroicons-x-circle-solid',
    //     timeout: 2000
    //   })
    // }

    return {
      // toggleSavedJob,
      // notificationSavedJob,
      // toastJob,
      curr_page
    }
  }
})
</script>

<style scoped></style>
