<template>
  <div>
    <div class="proposal--container py-8 px-4 md:px-9 mx-auto max-w-screen-xl dark:bg-theme-dark">
      <p class="proposal--page text-xl pr-24 md:pr-0 mx-3 md:mx-0 my-6 font-semibold">Đề xuất công việc</p>
      <div class="proposal--box">
        <p class="proposal--box--title">Thông tin đề xuất</p>
        <div class="proposal-content">
          <div class="box-hover flex">
            <p class="text-sm">Đề xuất này yêu cầu <span class="font-medium">8 kết nối</span></p>
            <UTooltip :ui="{ width: 'max-w-md' }" text="Số lượng kết nối còn lại trong tài khoản sau khi gửi đề xuất.">
              <UIcon class="text-primary w-" name="i-heroicons-question-mark-circle-solid" />
            </UTooltip>
          </div>
        </div>
      </div>
      <div class="proposal--box">
        <p class="proposal--box--title">Mô tả công việc</p>
        <div v-for="job in jobRequired" :key="job.id" class="proposal--icon--content p-3">
          <div class="middle flex flex-col md:flex-row">
            <div class="middle-content basis-1 md:basis-4/5">
              <p class="title-job proposal-title">{{ job.jobName }}</p>
              <h3 class="proposal--author">
                <nuxt-link to="/">
                  {{ job.author }}
                </nuxt-link>
              </h3>
              <div class="flex">
                <div class="my-auto">
                  <UBadge color="white">{{ job.jobPosition }}</UBadge>
                </div>
                <p
                  class="text-sm text-opacity-60 dark:text-opacity-60 text-tertiary dark:text-tertiary-light my-auto mx-5"
                >
                  Ngày đăng tin: {{ job.date }}
                </p>
              </div>
              <p class="description-job text-justify pr-0 md:pr-24 my-2 font-light">
                <span class="proposal-title font-semibold">Nội dung công việc: </span> {{ job.jobDescription }}
              </p>
            </div>
            <div
              class="illustration pl-0 md:pl-5 basis-1 md:basis-1/5 flex flex-row md:flex-col border-0 dark:border-0 md:border-l md:dark:border-l md:dark:border-gray-600 justify-between sm:px-4"
            >
              <div class="proposal--icon">
                <UIcon
                  class="text-primary w-6 h-6 mx-auto md:mx-0 md:mt-2 text-2xl"
                  name="i-heroicons-identification-solid"
                />
                <div class="proposal--icon--content">
                  <span class="ill-text test-sm">Kinh nghiệm</span>
                  <p class="proposal--illustrator">{{ job.level }}</p>
                </div>
              </div>
              <div class="proposal--icon">
                <UIcon
                  class="text-primary w-6 h-6 mx-auto md:mx-0 md:mt-2 text-2xl"
                  name="i-heroicons-currency-dollar-solid"
                />
                <div class="proposal--icon--content">
                  <p class="ill-text">Tiền lương</p>
                  <p class="proposal--illustrator">{{ formatVND(job.salaryOffer) }}</p>
                </div>
              </div>
              <div class="proposal--icon">
                <UIcon class="text-primary w-6 h-6 mx-auto md:mx-0 md:mt-2 text-2xl" name="i-heroicons-clock-solid" />
                <div class="proposal--icon--content">
                  <p class="ill-text">Thời hạn</p>
                  <p class="proposal--illustrator">{{ job.deadline }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="bottom mt-1 border-t dark:border-t-gray-600">
            <p class="proposal-title font-semibold">Kỹ năng và chuyên môn</p>
            <div class="skills flex flex-wrap sm:justify-normal gap-2">
              <UBadge v-for="tag in jobSkills" :key="tag.skill" color="white">{{ tag.skill }}</UBadge>
            </div>
          </div>
        </div>
      </div>
      <div class="proposal--box">
        <p class="proposal--box--title">Thời gian</p>
        <div class="proposal-content">
          <p class="text-sm">Thời gian dự kiến hoàn thành dự án</p>
          <div class="select my-3">
            <div class="md:w-1/5">
              <USelectMenu v-model="value" :options="options" class="" placeholder="Lựa chọn mốc thời gian">
              </USelectMenu>
            </div>
          </div>
        </div>
      </div>
      <div class="proposal--box">
        <p class="proposal--box--title">Đề xuất cho công việc</p>
        <div class="proposal-content">
          <p class="my-0 md:my-2 text-base mb-4">Nhập vào số tiền bạn muốn đề xuất</p>
          <div class="bid-content flex flex-col md:flex-row">
            <div class="basis-8/12"><ProposalSalary></ProposalSalary></div>
            <div class="basis-4/12">
              <div class="flex flex-row md:flex-col justify-center p-0">
                <img
                  src="~/assets/images/proposal/icon1.png"
                  class="img-responsive h-12 md:h-32 mx-auto my-auto"
                  alt="Image"
                />
                <p class="text-left md:text-center pl-5 md:py-3 py-3 font-extralight">
                  Bao gồm bảo vệ giá cố định TimViecKienGiang.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="proposal--box">
        <p class="proposal--box--title">Lời nhắn</p>
        <div class="proposal-content">
          <div class="proposal--letter">
            <div class="proposal--icon--content my-auto">
              <p class="text-sm">Gửi cho nhà tuyển dụng</p>
              <UTextarea
                id="message"
                v-model="message"
                :rows="5"
                class="w-full mt-3"
                placeholder="Nhập nội dung của bạn ở đây"
              ></UTextarea>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full md:w-1/12"><UButton class="w-full rounded-2xl justify-center">Gửi</UButton></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  name: 'ProposalComponent',
  setup() {
    const value = ref('1 tháng')
    const options = [
      {
        value: '1 tuần',
        label: '1 tuần'
      },
      {
        value: '3 tuần',
        label: '3 tuần'
      },
      {
        value: '1 tháng',
        label: '1 tháng'
      },
      {
        value: '3 tháng',
        label: '3 tháng'
      },
      {
        value: 'Trên 4 tháng',
        label: 'Trên 4 tháng'
      }
    ]
    const jobRequired = [
      {
        id: 1,
        author: 'Công ty sữa Vinamilk',
        jobName: 'Xây dựng giao diện website và landing page quảng cáo thương hiệu',
        jobPosition: 'Frontend',
        date: '04/08/2023',
        jobDescription:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat debitis laborum iste earum architecto amet, fugit maiores unde, optio alias fugiat, quam doloremque esse reprehenderit veniam voluptatum reiciendis nesciunt provident.',
        level: 'Junior',
        salaryOffer: 18000000,
        deadline: '11/12/2023'
      }
    ]
    const jobSkills = [
      {
        skill: 'PHP'
      },
      {
        skill: 'HTML'
      },
      {
        skill: 'TailwindCSS'
      },
      {
        skill: 'Boostrap'
      },
      {
        skill: 'Vue JS'
      },
      {
        skill: 'Laravel'
      }
    ]
    // Xử lý tiền người dùng nhập vào từ input tổng tiền
    const totalSalary = ref<number>(0)
    const taxFee = ref<number>(0)
    const receivedAmount = ref<number>(0)

    watch(totalSalary, (newValue) => {
      taxFee.value = newValue * 0.02
      receivedAmount.value = newValue - taxFee.value
    })

    const message = ref('')

    return {
      value,
      options,
      jobRequired,
      jobSkills,
      totalSalary,
      taxFee,
      receivedAmount,
      message
    }
  },
  methods: {
    //Hàm định dạng tiền tệ VNĐ
    formatVND(number: number | bigint) {
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number)
    }
  }
})
</script>

<style scoped>
.proposal--box {
  @apply border dark:border-gray-600 rounded-xl p-3 md:p-6 mb-4 md:mb-4;
}
.proposal--box--title {
  @apply text-lg leading-5 font-semibold md:mb-4;
}
.proposal-content {
  @apply mt-3 md:mt-0 px-3;
}
.proposal-title {
  @apply my-2 text-sm font-semibold pb-1;
}
.proposal--icon {
  @apply flex flex-col md:flex-row gap-0 my-1;
}
.proposal--icon .proposal--icon--content {
  @apply flex text-center md:text-left flex-col sm:ml-3 text-sm font-semibold;
}
.proposal--illustrator {
  @apply font-extralight text-sm;
}
.proposal--author {
  @apply text-sm pb-2 font-semibold text-tertiary/60 dark:text-primary hover:underline hover:text-primary dark:hover:text-tertiary-light;
}
</style>
