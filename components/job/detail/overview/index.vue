<template>
  <div>
    <div class="overview__jobDetail job__section">
      <div class="overview__jobDetail--item">
        <UIcon name="i-heroicons-briefcase" class="overview__jobDetail--icon" />
        <p class="overview__jobDetail--title">Kinh nghiệm:</p>
        {{ jobData?.job_requirement?.experience?.name }}
      </div>
      <!-- <div class="overview__jobDetail--item">
        <UIcon name="i-heroicons-newspaper" class="overview__jobDetail--icon" />
        <p class="overview__jobDetail--title">Chức vụ:</p>
        {{ jobData?.position }}
      </div> -->
      <div class="overview__jobDetail--item">
        <UIcon name="i-heroicons-identification" class="overview__jobDetail--icon" />
        <p class="overview__jobDetail--title">Yêu cầu bằng cấp:</p>
        {{ jobData?.job_requirement?.degree?.name }}
      </div>
      <!-- <div class="overview__jobDetail--item">
        <UIcon name="i-heroicons-user-plus" class="overview__jobDetail--icon" />
        <p class="overview__jobDetail--title">Số lượng cần tuyển:</p>
        {{ jobData?.quantity }}
      </div> -->
      <div class="overview__jobDetail--item">
        <UIcon name="i-heroicons-credit-card" class="overview__jobDetail--icon" />
        <p class="overview__jobDetail--title">Hình thức làm việc:</p>
        {{ jobData?.job_type?.name }}
      </div>
      <div class="overview__jobDetail--item">
        <UIcon name="i-heroicons-list-bullet" class="overview__jobDetail--icon" />
        <p class="overview__jobDetail--title">Ngành nghề:</p>
        <nuxt-link
          to="https://www.google.com/maps/@9.779349,105.6189045,11z?hl=vi-VN"
          class="overview__jobDetail--link"
          >{{ jobData?.job_requirement?.major?.name }}</nuxt-link
        >
      </div>
      <div class="overview__jobDetail--item items-start">
        <UIcon name="i-heroicons-map" class="overview__jobDetail--icon" />
        <p class="overview__jobDetail--title whitespace-nowrap">Địa điểm làm việc:</p>
        <span class="overview__jobDetail--link">
          {{ jobData?.job_detail?.address || '' }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    jobData: {
      type: Object,
      default: () => ({}) as Job
    }
  },
  setup() {
    return {}
  }
})
</script>

<style scoped>
.overview__jobDetail {
  @apply grid grid-cols-1 md:grid-cols-2 gap-2;
}
.overview__jobDetail--item {
  @apply flex flex-row items-center dark:text-gray-300 gap-2 text-sm;
}
.overview__jobDetail--title {
  @apply text-sm font-semibold dark:text-white;
}
.overview__jobDetail--icon {
  @apply text-xl;
}
.overview__jobDetail--link {
  @apply text-primary hover:text-green-600 dark:text-primary/80 dark:hover:text-primary;
}
</style>
