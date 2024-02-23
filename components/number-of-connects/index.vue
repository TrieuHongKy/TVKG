<script lang="ts">
import { ref, computed } from 'vue'

interface User {
  id: number
  connect: number
}

export default {
  setup() {
    const users = ref<User[]>([{ id: 1, connect: 70 }])

    const connects = computed(() => {
      return users.value[0].connect
    })

    return {
      connects
    }
  }
}
</script>

<template>
  <span>{{ connects }}</span>
</template>

<style scoped></style>
