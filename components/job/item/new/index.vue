<template>
  <div class="item__special sticky top-20">
    <div class="special--label flex flex-row items-center gap-1 pb-4">
      <h2 class="text-lg font-semibold text-green-800 dark:text-primary">VIỆC LÀM MỚI NHẤT</h2>
    </div>
    <div class="flex flex-col gap-2">
      <div v-for="job in jobData" :key="job?.id" class="ct-card py-2">
        <div class="special--company flex flex-row">
          <nuxt-link :to="`company/${job?.company?.slug}`" class="company--avatar flex items-center justify-center">
            <img
              :src="job?.company?.company_logo"
              :alt="job?.company?.company_name"
              class="w-[100px] object-cover p-2"
            />
          </nuxt-link>
          <div class="company--infor w-full flex flex-col gap-1 justify-center">
            <nuxt-link :to="`job/${job?.id}`">
              <p
                class="infor--company text-secondary hover:text-primary dark:hover:text-primary font-bold dark:text-tertiary-light line-clamp-1 text-base"
              >
                {{ job?.job_detail?.title }}
                <UBadge v-if="job?.job_attribute?.is_featured">Nổi bật</UBadge>
              </p>
            </nuxt-link>
            <p class="infor--address text-sm line-clamp-1">
              {{ job?.job_detail?.address }}
            </p>
            <div class="infor--description w-full flex">
              <div class="flex items-center w-full md:w-1/2 gap-1 sm:gap-2">
                <UIcon
                  name="i-heroicons-currency-dollar-solid"
                  class="infor--icon text-green-600 dark:text-tertiary-light text-lg"
                />
                <p class="infor--value text-sm sm:text-base">{{ convertToVND(job?.job_salary?.fixed_salary) }}</p>
              </div>
              <div class="flex items-center w-full md:w-1/2 gap-1 sm:gap-2">
                <UIcon
                  name="i-heroicons-clock-solid"
                  class="infor--icon dark:text-tertiary-light text-green-600 text-lg"
                />
                <p class="infor--value text-sm sm:text-base">
                  {{ timeSince(new Date(job?.job_attribute?.published_at)) }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import type { Job } from '~/types/job'

export default defineComponent({
  name: 'JobNew',
  props: {
    jobData: {
      type: Array as PropType<Job[]>,
      default: () => []
    }
  },
  setup() {}
})
</script>
<style scoped></style>
