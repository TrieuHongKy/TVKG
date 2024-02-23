<script lang="ts">
import { ref, computed } from 'vue'

interface User {
  id: number
  balance: number
}

export default {
  setup() {
    const users = ref<User[]>([{ id: 1, balance: 1000000 }])

    const balances = computed(() => {
      return users.value[0].balance
    })

    const formatCurrency = (value: number) => {
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)
    }

    return {
      balances,
      formatCurrency
    }
  }
}
</script>

<template>
  <span>{{ formatCurrency(balances) }}</span>
</template>

<style scoped></style>
