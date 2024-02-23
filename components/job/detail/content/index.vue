<template>
  <div class="detail__content--card job__section">
    <div class="content--description">
      <div class="content--heading">
        <p class="content--heading--title">Chi tiết tin tuyển dụng</p>
        <div class="content-linebot flex flex-row">
          <div class="primaryline"></div>
          <div class="grayline"></div>
        </div>
      </div>
      <div class="content--information py-3">
        <p v-html="jobData?.job_detail?.description"></p>
      </div>
    </div>
    <div class="content--required">
      <div class="content--heading">
        <p class="content--heading--title">Yêu cầu công việc</p>
        <div class="content-linebot flex flex-row">
          <div class="primaryline"></div>
          <div class="grayline"></div>
        </div>
      </div>
      <div class="content--information py-3">
        <div class="information--text">
          <!-- {{ jobData?. }} -->
          <p><b>Chuyên ngành: </b> {{ jobData?.job_requirement?.major?.name }}</p>
          <p>
            <b>Trình độ: </b>
            {{ jobData?.job_requirement?.degree?.name }}
          </p>
          <p>
            <b>Kinh nghiệm: </b>
            {{ jobData?.job_requirement?.experience?.name }}
          </p>
        </div>
      </div>
    </div>
    <!-- <div class="content--benefit">
      <div class="content--heading">
        <p class="content--heading--title">Quyền lợi cá nhân</p>
        <div class="content-linebot flex flex-row">
          <div class="primaryline"></div>
          <div class="grayline"></div>
        </div>
      </div>
      <div class="content--information py-3">
        <p class="information--text">Salary</p>
      </div>
    </div> -->
    <!-- <div class="content--request">
      <div class="content--heading">
        <p class="content--heading--title">Yêu cầu hồ sơ</p>
        <div class="content-linebot flex flex-row">
          <div class="primaryline"></div>
          <div class="grayline"></div>
        </div>
      </div>
      <div class="content--information py-2">
        <p class="information--text">Request</p>
      </div>
    </div> -->
    <div class="content--contact">
      <div class="content--heading">
        <p class="content--heading--title">Thông tin liên hệ</p>
        <div class="content-linebot flex flex-row">
          <div class="primaryline"></div>
          <div class="grayline"></div>
        </div>
      </div>
      <div class="content--information flex flex-col gap-2 p-2">
        <div class="content--information--value flex flex-row gap-2">
          <UIcon name="i-heroicons-phone" class="value--icon" />
          <p class="information--text">
            <span>
              {{ jobData?.company?.user?.phone }}
            </span>
          </p>
        </div>
        <div class="content--information--value flex flex-row gap-2">
          <UIcon name="i-heroicons-envelope" class="value--icon" />
          <p class="information--text">
            <span>
              {{ jobData?.company?.user?.email }}
            </span>
          </p>
        </div>
        <div class="content--information--value flex flex-row gap-2">
          <UIcon name="i-heroicons-map-pin" class="value--icon" />
          <p class="information--text">
            <span>
              {{ jobData?.company?.company_address }}
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import type { Job } from '~/types/job'

export default defineComponent({
  name: 'JobDetailsContent',
  props: {
    jobData: {
      type: Object,
      required: true,
      default: () => ({}) as Job
    }
  },
  setup(props) {
    const { jobData } = props
    const job = ref<Job | null>(null)
    onMounted(async () => {
      job.value = jobData as Job
    })
    return { job }
  }
})
</script>
<style scoped>
.content--heading--title {
  @apply text-lg font-semibold pb-2;
}
.information--text {
  @apply text-sm leading-6 sm:px-3 dark:text-gray-300 text-gray-700 text-justify;
}
.value--icon {
  @apply my-auto text-lg text-primary;
}
.primaryline {
  @apply basis-2/5 border-b border-green-500;
}
.grayline {
  @apply basis-3/5 border-b;
}
</style>
