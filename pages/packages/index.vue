<template>
  <div class="packages__layout border-default">
    <div class="packages__heading">
      <p class="packages__title">Bảng Giá Đăng Tin Của TVKG</p>
      <div class="flex flex-row">
        <div class="basis-2/5 border-b-2 border-green-500"></div>
        <div class="basis-3/5 border-b"></div>
      </div>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <packages-list :package="selectedPackage"></packages-list>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const selectedPackage = ref(false)
    return { selectedPackage }
  }
})
</script>

<style scoped>
.packages__layout {
  @apply flex flex-col m-2 gap-6 p-6;
}
.packages__title {
  @apply text-lg font-semibold pb-2;
}
</style>
