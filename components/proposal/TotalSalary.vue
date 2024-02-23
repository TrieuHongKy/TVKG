<template>
  <form class="w-full">
    <div class="flex flex-col md:flex-row">
      <div class="label-group">
        <label for="salary" class="label-1">Tổng số tiền:</label>
        <label for="salary" class="label-2">Tổng số tiền khách hàng sẽ thấy.</label>
      </div>
      <div class="custom-input flex md:flex-none md:mx-auto">
        <UInput
          id="salary"
          v-model="totalSalary"
          type="number"
          min="0"
          class="input-bid basis-4/5"
          oninput="this.value = Math.abs(this.value)"
          required
        />
        <span class="my-auto mx-0 text-xs basis-1/5 text-gray-400">đ/giờ</span>
      </div>
    </div>
  </form>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TotalSalaryProposal',
  emits: ['updateValues'],
  setup(props, { emit }) {
    // Xử lý tiền người dùng nhập vào từ input tổng tiền
    const totalSalary = ref<number>(0)

    watchEffect(() => {
      emit('updateValues', { totalSalary: totalSalary.value })
    })
    return {
      totalSalary
    }
  }
})
</script>
<style scoped>
.input-bid {
  @apply basis-4/5 text-tertiary dark:text-tertiary-light outline-none text-sm rounded-lg h-fit md:my-auto block w-full p-1 ring-0;
}
.label-group {
  @apply basis-3/5 my-auto;
}
.label-1 {
  @apply block mb-1 text-base font-normal text-gray-900 dark:text-white;
}
.label-2 {
  @apply block text-sm font-light text-gray-900 dark:text-white;
}
</style>
