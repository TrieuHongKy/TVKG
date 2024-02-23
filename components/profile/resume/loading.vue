<template>
  <div>
    <div class="profile__section">
      <div>
        <div class="profile__title--content">
          <div class="profile__title--header">
            <USkeleton class="h-4 w-3/4 md:w-[400px]" />
          </div>
          <div class="profile__title--action">
            <USkeleton class="h-6 w-6" :ui="{ rounded: 'rounded-full' }" />
          </div>
        </div>
      </div>
      <!-- <profile-salary :show-salary="salary" :public="public"></profile-salary> -->
      <div class="mb-4 md:m-4">
        <span class="pr-0 md:pr-4 space-y-2">
          <USkeleton class="h-4 w-[200px]" />
          <USkeleton class="h-4 w-full md:w-[600px]" />
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  }
})
</script>

<style scoped>
.profile__title {
  @apply p-4 bg-card dark:bg-card-dark rounded-lg;
}
.profile__title--content {
  @apply flex justify-between pb-0 md:pb-2;
}
.profile__title--header {
  @apply font-semibold text-lg;
}
.profile__title--icon {
  @apply w-5 h-5 text-center rounded-full border-primary border text-primary cursor-pointer;
}
.profile__title--action {
  @apply flex items-center justify-center font-bold gap-3;
}
.profile__title--default {
  @apply flex flex-col md:flex-row gap-2 px-4 py-2 md:items-center;
}
</style>
