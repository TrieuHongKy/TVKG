<template>
  <div class="w-full">
    <div class="profile__pages--jobContent">
      <div class="border-b border-primary p-6">
        <p class="font-semibold text-lg">Danh Sách Việc Làm Yêu Thích</p>
      </div>
      <div class="hidden md:block">
        <div class="flex flex-row p-2 border-b border-primary">
          <p class="w-[50%] text-center text-green-600 font-semibold">Vị trí tuyển dụng</p>
          <p class="w-[15%] text-center text-green-600 font-semibold">Khu Vực</p>
          <p class="w-[15%] text-center text-green-600 font-semibold">Mức lương</p>
          <p class="w-[20%] text-center text-green-600 font-semibold">Ngày nộp hồ sơ</p>
        </div>
      </div>
      <div
        v-for="job in paginatedJobs"
        :key="job.id"
        class="grid grid-cols-12 md:flex md:flex-row py-4 mx-4 [&:not(:last-child)]:border-b border-primary"
      >
        <div
          class="grid grid-cols-12 col-span-12 md:w-[50%] md:flex md:flex-row items-center overflow-hidden gap-4 pb-2 md:pb-0"
        >
          <div class="col-span-1">
            <UCheckbox name="checkbox1" :value="false" />
          </div>
          <div class="col-span-11 md:flex md:flex-col items-start">
            <nuxt-link
              to="#"
              class="text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 text-sm line-clamp-1"
              >{{ job.jobName }}</nuxt-link
            >
            <p class="text-sm line-clamp-1">{{ job.companyName }}</p>
          </div>
        </div>
        <div class="col-span-4 md:w-[15%] md:text-center md:flex items-center justify-center">
          <p>{{ job.address }}</p>
        </div>
        <div class="col-span-4 md:w-[15%] md:text-center md:flex items-center justify-center">
          <p>{{ job.minSalary }}-{{ job.maxSalary }} triệu</p>
        </div>
        <div class="col-span-4 md:w-[20%] md:text-center md:flex items-center justify-center">
          <p>{{ job.dateEnd }}</p>
        </div>
      </div>
      <div class="flex flex-row px-4 gap-2 items-center">
        <UCheckbox name="all" :value="false" />
        <p class="text-green-600 dark:tex-primary px-4 py-2 cursor-pointer">Xóa việc làm</p>
      </div>
      <div class="flex p-2 justify-center items-center">
        <UPagination v-model="page" size="md" :page-count="itemsPerPage" :total="totalItems" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const jobs = [
      {
        id: 1,
        companyName: 'CÔNG TY FAVV KCN BÌNH MINH VĨNH LONG (TẬP ĐOÀN FAS NHẬT BẢN)',
        address: 'Vĩnh Long',
        jobName: '1000 NHÂN VIÊN NỮ 18-35 TUỔI SẢN XUẤT.',
        minSalary: 7,
        maxSalary: 15,
        dateEnd: '28/4/2023'
      },
      {
        id: 2,
        companyName: 'CÔNG TY FAVV KCN BÌNH MINH VĨNH LONG (TẬP ĐOÀN FAS NHẬT BẢN)',
        address: 'Vĩnh Long',
        jobName: '1000 NHÂN VIÊN NỮ 18-35 TUỔI SẢN XUẤT.',
        minSalary: 7,
        maxSalary: 15,
        dateEnd: '28/4/2023'
      },
      {
        id: 3,
        companyName: 'CÔNG TY FAVV KCN BÌNH MINH VĨNH LONG (TẬP ĐOÀN FAS NHẬT BẢN)',
        address: 'Vĩnh Long',
        jobName: '1000 NHÂN VIÊN NỮ 18-35 TUỔI SẢN XUẤT.',
        minSalary: 7,
        maxSalary: 15,
        dateEnd: '28/4/2023'
      },
      {
        id: 4,
        companyName: 'CÔNG TY FAVV KCN BÌNH MINH VĨNH LONG (TẬP ĐOÀN FAS NHẬT BẢN)',
        address: 'Vĩnh Long',
        jobName: '1000 NHÂN VIÊN NỮ 18-35 TUỔI SẢN XUẤT.',
        minSalary: 7,
        maxSalary: 15,
        dateEnd: '28/4/2023'
      },
      {
        id: 5,
        companyName: 'CÔNG TY FAVV KCN BÌNH MINH VĨNH LONG (TẬP ĐOÀN FAS NHẬT BẢN)',
        address: 'Vĩnh Long',
        jobName: '1000 NHÂN VIÊN NỮ 18-35 TUỔI SẢN XUẤT.',
        minSalary: 7,
        maxSalary: 15,
        dateEnd: '28/4/2023'
      },
      {
        id: 6,
        companyName: 'CÔNG TY FAVV KCN BÌNH MINH VĨNH LONG (TẬP ĐOÀN FAS NHẬT BẢN)',
        address: 'Vĩnh Long',
        jobName: '1000 NHÂN VIÊN NỮ 18-35 TUỔI SẢN XUẤT.',
        minSalary: 7,
        maxSalary: 15,
        dateEnd: '28/4/2023'
      }
    ]

    const page = ref(1)
    const totalItems = ref(jobs.length)
    const itemsPerPage = 5

    const paginatedJobs = computed(() => {
      const start = (page.value - 1) * itemsPerPage
      const end = start + itemsPerPage
      return jobs.slice(start, end)
    })
    return { page, totalItems, itemsPerPage, paginatedJobs }
  }
})
</script>

<style scoped>
.profile__pages--jobContent {
  @apply w-full border border-primary rounded-xl;
}
</style>
