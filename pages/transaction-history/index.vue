<script lang="ts">
import { computed, ref } from 'vue'

export default {
  setup() {
    const columns = [
      { key: 'id', label: '#' },
      { key: 'content', label: 'Nội Dung', sortable: true },
      { key: 'description', label: 'Mô Tả', sortable: true },
      { key: 'created_at', label: 'Thời Gian', sortable: true }
    ]
    const transaction = [
      {
        id: 1,
        content: 'Nạp tiền 500000',
        description: 'Nạp tiền vào tài khoản',
        created_at: '2023-08-25'
      },
      {
        id: 2,
        content: 'Nạp tiền 200000',
        description: 'Nạp tiền vào tài khoản',
        created_at: '2023-08-25'
      },
      {
        id: 3,
        content: 'Nạp tiền 400000',
        description: 'Nạp tiền vào tài khoản',
        created_at: '2023-08-25'
      }
    ]

    const yearOptions = [
      { label: 'Năm 2023', value: '2023' },
      { label: 'Năm 2022', value: '2022' },
      { label: 'Năm 2021', value: '2021' }
    ]

    const quarterOptions = [
      { label: 'Quý 1 (Tháng 1 - Tháng 3)', value: '1' },
      { label: 'Quý 2 (Tháng 3 - Tháng 6)', value: '2' },
      { label: 'Quý 3 (Tháng 6 - Tháng 9)', value: '3' },
      { label: 'Quý 4 (Tháng 9 - Tháng 12)', value: '4' }
    ]

    const selected = ref([transaction[0]])
    const selectedQuarter = ref(quarterOptions[0].value)
    const selectedYear = ref(yearOptions[0].value)
    const page = ref(1)
    const pageCount = 10

    const filteredTransactions = computed(() => {
      if (!selectedQuarter.value && !selectedYear.value) {
        return transaction
      }

      return transaction.filter((trans) => {
        const createdDate = new Date(trans.created_at)
        const quarter = Math.floor((createdDate.getMonth() + 3) / 3).toString()
        const year = createdDate.getFullYear().toString()

        return (
          (!selectedQuarter.value || quarter === selectedQuarter.value) &&
          (!selectedYear.value || year === selectedYear.value)
        )
      })
    })

    const rows = computed(() => {
      return filteredTransactions.value.slice((page.value - 1) * pageCount, page.value * pageCount)
    })

    return {
      columns,
      transaction,
      selectedYear,
      selectedQuarter,
      filteredTransactions,
      yearOptions,
      quarterOptions,
      selected,
      rows,
      pageCount,
      page
    }
  }
}
</script>

<template>
  <section class="transaction-history p-10">
    <div class="title text-xl py-2">Lịch sử giao dịch</div>
    <div class="amount text-sm">
      Tiền còn lại: <span class="text-primary"><user-balance></user-balance></span>
    </div>
    <UCard class="my-5">
      <div class="mb-5">
        <span class="block mb-3">Kỳ sao kê:</span>
        <div class="block sm:flex items-center justify-between">
          <div class="filter py-5 md:py-0">
            <div class="flex gap-2">
              <USelect v-model="selectedYear" :options="yearOptions" label="Chọn năm" clearable />
              <USelect v-model="selectedQuarter" :options="quarterOptions" label="Chọn quý" clearable />
            </div>
          </div>
          <div class="download flex gap-4">
            <UButton class="rounded-full"><UIcon name="i-heroicons-arrow-down-tray" />SCV</UButton>
            <UButton class="rounded-full"><UIcon name="i-heroicons-arrow-down-tray" />Hóa Đơn</UButton>
          </div>
        </div>
      </div>
      <UTable
        v-model="selected"
        :empty-state="{
          icon: 'i-heroicons-circle-stack-20-solid',
          label: 'Không có giao dịch nào đáp ứng tiêu chí của bạn.'
        }"
        :columns="columns"
        :rows="rows"
      />
      <template #footer>
        <div class="flex justify-end">
          <UPagination v-model="page" :page-count="pageCount" :total="transaction.length" />
        </div>
      </template>
    </UCard>
  </section>
</template>

<style scoped></style>
