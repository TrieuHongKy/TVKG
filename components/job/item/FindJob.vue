<template>
  <div class="item__findjob--card">
    <div class="item__findjob--avatar">
      <img src="https://anbinhck.com/images/albums/2021/02/06/132570677924418582.jpg" alt="" class="w-full h-full" />
    </div>
    <div class="item__findjob--content">
      <div class="item__findjob--information flex flex-col justify-center gap-1">
        <nuxt-link to="/"
          ><div class="findjob--information--title">{{ jobTitle }}</div></nuxt-link
        >
        <nuxt-link to="/"
          ><div class="findjob--information--company">{{ author }}</div></nuxt-link
        >
        <div class="findjob--information--description">
          <div class="flex">
            <UIcon name="i-heroicons-credit-card" class="description--icon" />
            <p class="description--value">
              <span>{{ formatVND(salary) }}</span>
            </p>
          </div>
          <div class="md:flex hidden">
            <UIcon name="i-heroicons-map-pin" class="description--icon" />
            <p class="description--value">{{ location }}</p>
          </div>
          <div class="flex">
            <UIcon name="i-heroicons-calendar-days" class="description--icon" />
            <p class="description--value">{{ formatDate(postDate) }}</p>
          </div>
        </div>
      </div>
      <div class="item__findjob--savejob flex flex-row cursor-pointer md:ml-28" @click="handleSaveJob">
        <UIcon v-if="!isJobSaved" name="i-heroicons-bookmark" class="description--icon" />
        <UIcon v-if="isJobSaved" name="i-heroicons-check-circle" class="description--icon" />
        <p v-if="!isJobSaved" class="ml-1 md:text-xs text-gray-400 hover:text-primary">Lưu tin tuyển dụng</p>
        <p v-if="isJobSaved" class="ml-1 md:text-xs text-primary">Đã lưu tin</p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default defineComponent({
  name: 'CarouselCard',
  props: {
    author: {
      type: String,
      required: true
    },
    jobTitle: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    postDate: {
      type: Number,
      required: true
    },
    salary: {
      type: Number,
      required: true
    },
    businessAccount: {
      type: Boolean,
      required: false,
      default: false
    },
    type: {
      type: String,
      required: true,
      default: 'normal'
    },
    lasted: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  setup() {
    //data jobcard newjobs
    // const jobs = [
    //   {
    //     author: 'Công ty cổ phần BMCORM Việt nam',
    //     jobTitle: 'Nhân viên kế toán sản xuất',
    //     jobType: 'Frontend',
    //     postDate: 1696912900,
    //     jobDescription:
    //       'Công việc yêu cầu cắt HTML CSS từ design figma sau đó triển khai giao diện và sửa lỗi khi phát sinh lỗi.',
    //     skills: ['Figma', 'HTML', 'CSS', 'Vue JS'],
    //     location: 'Cần Thơ',
    //     salary: 2000000,
    //     businessAccount: true,
    //     type: 'Toàn thời gian',
    //     position: 'special'
    //   },
    //   {
    //     author: 'Công ty TNHH Ô tô Trường Tấn',
    //     jobTitle: 'Nhân viên kinh doanh (Xe du lịch)',
    //     jobType: 'Frontend',
    //     postDate: 1696912800,
    //     jobDescription:
    //       'Công việc yêu cầu cắt HTML CSS từ design figma sau đó triển khai giao diện và sửa lỗi khi phát sinh lỗi.',
    //     skills: ['Figma', 'HTML', 'CSS', 'Vue JS'],
    //     location: 'Cần Thơ',
    //     salary: 2000000,
    //     businessAccount: true,
    //     type: 'part time',
    //     position: 'Sinh viên - Thực tập sinh'
    //   },
    //   {
    //     author: 'Trust Pay Viet Nam',
    //     jobTitle: 'Trưởng nhóm Pháp chế',
    //     jobType: 'Frontend',
    //     postDate: 1696913700,
    //     jobDescription:
    //       'Công việc yêu cầu cắt HTML CSS từ design figma sau đó triển khai giao diện và sửa lỗi khi phát sinh lỗi.',
    //     skills: ['Figma', 'HTML', 'CSS', 'Vue JS'],
    //     location: 'Cần Thơ',
    //     salary: 2000000,
    //     businessAccount: true,
    //     type: 'special',
    //     position: 'special'
    //   },
    //   {
    //     author: 'Công ty cổ phần MBICOTECH',
    //     jobTitle: 'Nhân viên trưởng bộ phận bảo trì',
    //     jobType: 'Frontend',
    //     postDate: 1696912600,
    //     jobDescription:
    //       'Công việc yêu cầu cắt HTML CSS từ design figma sau đó triển khai giao diện và sửa lỗi khi phát sinh lỗi.',
    //     skills: ['Figma', 'HTML', 'CSS', 'Vue JS'],
    //     location: 'Kiên Giang',
    //     salary: 2000000,
    //     businessAccount: true,
    //     type: 'special',
    //     position: 'special'
    //   },
    //   {
    //     author: 'Tập đoàn King Group',
    //     jobTitle: 'Nhân viên tài xế xe nâng',
    //     jobType: 'Frontend',
    //     postDate: 1696917500,
    //     jobDescription:
    //       'Công việc yêu cầu cắt HTML CSS từ design figma sau đó triển khai giao diện và sửa lỗi khi phát sinh lỗi.',
    //     skills: ['Figma', 'HTML', 'CSS', 'Vue JS'],
    //     location: 'Kiên Giang',
    //     salary: 2000000,
    //     businessAccount: true,
    //     type: 'special',
    //     position: 'special'
    //   },
    //   {
    //     author: 'Văn phòng luật sư Tấn Phát',
    //     jobTitle: 'Phó phòng kế toán hành chính luật',
    //     jobType: 'Frontend',
    //     postDate: 1696912400,
    //     jobDescription:
    //       'Công việc yêu cầu cắt HTML CSS từ design figma sau đó triển khai giao diện và sửa lỗi khi phát sinh lỗi.',
    //     skills: ['Figma', 'HTML', 'CSS', 'Vue JS'],
    //     location: 'Kiên Giang',
    //     salary: 2000000,
    //     businessAccount: true,
    //     type: 'special',
    //     position: 'special'
    //   },
    //   {
    //     author: 'Hệ thống nhà thuốc Trung Sơn',
    //     jobTitle: 'Dược sĩ đào tạo',
    //     jobType: 'Frontend',
    //     postDate: 1696212900,
    //     jobDescription:
    //       'Công việc yêu cầu cắt HTML CSS từ design figma sau đó triển khai giao diện và sửa lỗi khi phát sinh lỗi.',
    //     skills: ['Figma', 'HTML', 'CSS', 'Vue JS'],
    //     location: 'Hậu Giang',
    //     salary: 2000000,
    //     businessAccount: true,
    //     type: 'normal',
    //     position: 'special'
    //   }
    // ]
    const formatVND = (number: number | bigint) => {
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number)
    }
    function formatDate(timestamp: number) {
      var date = new Date(timestamp * 1000)
      var day = date.getDate()
      var month = date.getMonth() + 1
      var year = date.getFullYear()
      return day + '/' + month + '/' + year
    }
    const isJobSaved = ref(false)
    const handleSaveJob = () => {
      isJobSaved.value = !isJobSaved.value
    }
    return {
      formatVND,
      formatDate,
      isJobSaved,
      handleSaveJob
    }
  }
})
</script>
<style scoped>
.item__findjob--card {
  @apply border dark:border-gray-500 flex flex-row md:px-7 py-3 px-3 gap-3 md:gap-7;
}
.item__findjob--avatar {
  @apply w-1/3 md:w-[120px] h-[80px];
}
.item__findjob--content {
  @apply flex flex-col w-2/3 md:flex-row md:w-full;
}
.findjob--information--title {
  @apply text-base font-semibold line-clamp-1 hover:text-primary hover:cursor-pointer;
}
.findjob--information--company {
  @apply text-sm font-thin text-opacity-60 dark:text-opacity-60 dark:text-tertiary-light/80 text-tertiary my-1 line-clamp-1 hover:text-theme-dark dark:hover:text-theme-light hover:cursor-pointer;
}
.findjob--information--description {
  @apply flex flex-row justify-start w-full gap-2 md:gap-14;
}
.description--icon {
  @apply text-primary text-base my-auto mx-0 z-0;
}
.description--value {
  @apply text-sm text-opacity-60 dark:text-opacity-60 dark:text-tertiary-light/80 text-tertiary my-auto mx-1 font-thin;
}
.item__findjob--savejob {
  @apply mt-2 md:my-auto;
}
</style>
