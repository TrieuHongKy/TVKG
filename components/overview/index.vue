<script lang="ts">
import { ref } from 'vue'

interface Overview {
  label: string
  describe: string
  cash: number
}

interface WorkInProgress {
  name: string
  organization: string
  category: string
  status: string
  start_time: string
  end_time: string
}

export default {
  setup() {
    const page = ref(1)
    const pageCount = 10

    const columns = [
      { key: 'name', label: 'Tên Dự Án', sortable: true },
      { key: 'organization', label: 'Tổ Chức', sortable: true },
      { key: 'category', label: 'Danh Mục', sortable: true },
      { key: 'status', label: 'Trạng Thái', sortable: true },
      { key: 'start_time', label: 'Thời gian bắt đầu', sortable: true },
      { key: 'end_time', label: 'Thời gian kết thúc', sortable: true }
    ]

    const overviews = ref<Overview[]>([
      {
        label: 'Công việc đang tiến hành',
        cash: 2000000,
        describe: 'ko co j'
      },
      {
        label: 'Đang xem xét',
        cash: 2000000,
        describe: 'ko co j'
      },
      {
        label: 'Chưa giải quyết',
        cash: 2000000,
        describe: 'ko co j'
      },
      {
        label: 'Có sẵn',
        cash: 2000000,
        describe: 'ko co j'
      }
    ])

    const work_in_progress = ref<WorkInProgress[]>([
      {
        name: 'Công việc thứ 1',
        organization: 'FPT',
        category: 'PHP',
        status: 'Đã Xong',
        start_time: '2023-06-06  10:24:58',
        end_time: '2023-08-06  10:24:58'
      },
      {
        name: 'Công việc thứ 2',
        organization: 'FPT',
        category: 'PHP',
        status: 'Đang xem xét',
        start_time: '2023-06-06  10:24:58',
        end_time: '2023-08-06  10:24:58'
      },
      {
        name: 'Công việc thứ 3',
        organization: 'FPT',
        category: 'PHP',
        status: 'Đang xem xét',
        start_time: '2023-06-06  10:24:58',
        end_time: '2023-08-06  10:24:58'
      },
      {
        name: 'Công việc thứ 3',
        organization: 'FPT',
        category: 'PHP',
        status: 'Đang xem xét',
        start_time: '2023-06-06  10:24:58',
        end_time: '2023-08-06  10:24:58'
      }
    ])

    const rows = computed(() => {
      return work_in_progress.value.slice((page.value - 1) * pageCount, page.value * pageCount)
    })

    return {
      columns,
      overviews,
      work_in_progress,
      rows,
      page,
      pageCount
    }
  }
}
</script>

<template>
  <section class="overview p-10">
    <UCard>
      <template #header>
        <div class="flex flex-wrap justify-between px-10 py-5">
          <div v-for="(overview, index) in overviews" :key="index" class="overview-item pb-5">
            <div class="title">
              {{ overview.label }}
              <UTooltip :text="overview.describe">
                <UIcon name="i-heroicons-question-mark-circle" />
              </UTooltip>
            </div>
            <div class="amount-of-money">{{ Intl.NumberFormat('vi-VN').format(overview.cash) }} VNĐ</div>
          </div>
        </div>
      </template>
      <UTable
        :empty-state="{ icon: 'i-heroicons-circle-stack-20-solid', label: 'Không có công việc nào đang thực hiện.' }"
        :columns="columns"
        :rows="rows"
      />
      <template #footer>
        <div class="flex justify-between items-center">
          <i class="text-rose-500 text-xs">*Bảng hiển thị công việc được cập nhật theo thời gian thực.</i>
          <UPagination v-model="page" :page-count="pageCount" :total="work_in_progress.length" />
        </div>
      </template>
    </UCard>
  </section>
</template>

<style scoped></style>
