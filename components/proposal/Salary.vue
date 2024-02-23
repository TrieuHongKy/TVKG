<template>
  <form class="proposal--salary--form w-full">
    <div class="proposal--salary--box">
      <div class="proposal--salary--group">
        <label for="salary" class="proposal--salary--label1">Tổng số tiền:</label>
        <label for="salary" class="proposal--salary--label2">Tổng số tiền khách hàng sẽ thấy.</label>
      </div>
      <div class="custom-input flex md:flex-none md:mx-auto">
        <UInput
          id="salary"
          v-model="totalSalary"
          type="number"
          min="0"
          class="proposal--salary--input basis-4/5"
          oninput="this.value = Math.abs(this.value)"
          required
        />
        <span class="my-auto mx-0 text-xs basis-1/5 text-gray-400">đ/giờ</span>
      </div>
    </div>
    <div class="proposal--salary--box">
      <div class="proposal--salary--group">
        <label for="fee" class="proposal--salary--label1">2% phí dịch vụ TVKG</label>
      </div>
      <div class="custom-input flex md:flex-none md:mx-auto">
        <UInput id="fee" type="number" class="proposal--salary--input" :value="taxFee" required disabled />
        <span class="my-auto mx-0 text-xs basis-1/5 text-gray-400">đ/giờ</span>
      </div>
    </div>
    <div class="proposal--salary--box">
      <div class="proposal--salary--group">
        <label for="amount-received" class="proposal--salary--label1">Tổng tiền </label>
        <label for="amount-received" class="proposal--salary--label2">Số tiền nhận được.</label>
      </div>
      <div class="custom-input flex md:flex-none md:mx-auto">
        <UInput
          id="amount-received"
          type="number"
          class="proposal--salary--input basis-1/3"
          :value="receivedAmount"
          required
          disabled
        />
        <span class="my-auto mx-0 text-xs basis-1/5 text-gray-400">đ/giờ</span>
      </div>
    </div>
  </form>
</template>
<script lang="ts">
import { defineComponent, watch } from 'vue'

export default defineComponent({
  name: 'ProposalComponent',
  setup() {
    // Xử lý tiền người dùng nhập vào từ input tổng tiền
    const totalSalary = ref<number>(0)
    const taxFee = ref<number>(0)
    const receivedAmount = ref<number>(0)

    watch(totalSalary, (newValue) => {
      taxFee.value = newValue * 0.02
      receivedAmount.value = newValue - taxFee.value
    })

    return {
      totalSalary,
      taxFee,
      receivedAmount
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
.proposal--salary--input {
  @apply basis-4/5 text-tertiary dark:text-tertiary-light outline-none text-sm rounded-lg h-fit md:my-auto block w-full p-1 mr-2 ring-0;
}
.proposal--salary--group {
  @apply basis-3/5  my-auto;
}
.proposal--salary--label1 {
  @apply block mb-1 text-base font-normal text-gray-900 dark:text-white;
}
.proposal--salary--label2 {
  @apply block text-sm font-light text-gray-900 dark:text-white;
}
.proposal--salary--box {
  @apply mb-6 flex flex-col md:flex-row;
}
</style>
