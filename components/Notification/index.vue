<template>
  <div>
    <UTooltip>
      <template #text>
        <span class="px-2"> Thông báo </span>
      </template>
      <button
        id="dropdownNotificationButton"
        data-dropdown-toggle="dropdownNotification"
        class="inline-flex items-center font-medium text-center text-gray-500 hover:text-gray-900 focus:outline-none dark:hover:text-white dark:text-gray-400"
        type="button"
      >
        <UIcon name="i-heroicons-bell" class="header__action-icon" />
        <span class="absolute top-0 right-0 px-1 py-0.5 rounded-full bg-red-500 text-white text-xs leading-3">2</span>
      </button>
    </UTooltip>

    <!-- Dropdown menu -->
    <div
      id="dropdownNotification"
      class="hidden bg-theme-light divide-y divide-gray-100 rounded-lg dark:bg-gray-800 dark:divide-gray-700 shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
      aria-labelledby="dropdownNotificationButton"
    >
      <div class="flex flex-col justify-between max-h-fit h-[calc(100vh_-_var(--h-header))] w-full max-w-sm">
        <div
          class="px-4 py-2 font-medium text-center text-gray-700 rounded-t-lg bg-gray-50 dark:bg-gray-700 dark:text-white flex items-center justify-center pointer-events-none"
        >
          <UIcon name="i-heroicons-bell" class="text-xl" />
          Thông báo
        </div>
        <div class="divide-y h-5/6 max-h-[5/6] basis-full divide-gray-100 dark:divide-gray-700">
          <div class="py-2 h-full overflow-y-auto">
            <template v-for="(notification, index) in notifications" :key="index">
              <NotificationCard :notification="notification" />
            </template>
          </div>
        </div>
        <nuxt-link
          to="notification-center"
          class="block py-2 text-sm font-medium text-center text-gray-900 rounded-b-lg bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-700 dark:text-white"
        >
          <div class="inline-flex items-center">Xem tất cả</div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { initFlowbite } from 'flowbite'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const notifications = ref(1)
    onMounted(() => {
      initFlowbite()
    })
    return { notifications }
  }
})
</script>

<style scoped></style>
