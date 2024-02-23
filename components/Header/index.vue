<template>
  <header
    class="z-50 sticky top-0 h-[var(--h-header)] flex justify-between items-center sm:justify-start z-5 text-sm bg-theme-light dark:bg-theme-dark line-header"
  >
    <div class="left flex basis-1/3 md:basis-1/2">
      <div class="block md:hidden">
        <NavMobile />
      </div>
      <div class="hidden md:block">
        <Nav :menus="menus" />
      </div>
    </div>
    <div class="block basis-1/3 md:hidden">
      <header-logo></header-logo>
    </div>
    <div class="right flex flex-nowrap gap-2 items-center justify-end basis-1/3 md:basis-1/2">
      <div v-if="!isLogin" class="btn-action hidden md:flex gap-2">
        <UButton :ui="{ rounded: 'rounded-full' }" variant="outline" class="px-4">
          <nuxt-link to="/auth/signup"> Đăng ký </nuxt-link>
        </UButton>
        <UButton :ui="{ rounded: 'rounded-full' }" class="px-4">
          <nuxt-link to="/auth/signin"> Đăng nhập </nuxt-link>
        </UButton>
      </div>
      <div v-if="isLogin" class="flex items-center justify-between">
        <!-- <div class="action flex gap-3 md:gap-2 items-center">
          <div class="contract hidden md:block">
            <div class="message-icon px-1 py-2">
              <UTooltip text="Hợp đồng">
                <button
                  class="inline-flex items-center font-medium text-center text-gray-500 hover:text-gray-900 focus:outline-none dark:hover:text-white dark:text-gray-400"
                >
                  <UIcon name="i-heroicons-briefcase" class="header__action-icon" />
                  <span class="absolute top-0 right-0 px-1 py-0.5 rounded-full bg-red-500 text-white text-xs leading-3"
                    >2</span
                  >
                </button>
              </UTooltip>
            </div>
          </div>
          <notification />
          <div class="message">
            <div class="message-icon px-1 py-2">
              <UTooltip text="Tin nhắn">
                <button
                  class="inline-flex items-center font-medium text-center text-gray-500 hover:text-gray-900 focus:outline-none dark:hover:text-white dark:text-gray-400"
                >
                  <UIcon name="i-heroicons-chat-bubble-left-right" class="header__action-icon" />
                  <span class="absolute top-0 right-0 px-1 py-0.5 rounded-full bg-red-500 text-white text-xs leading-3"
                    >2</span
                  >
                </button>
              </UTooltip>
            </div>
          </div>
        </div> -->
        <div class="mx-2 hidden md:block">
          <user-dropdown :user="user" />
        </div>
      </div>
      <div class=""><color-mode /></div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { menuItems } from '~/apis/mock-data/menus'
import { useAuthStore } from '~/stores/auth'

export default defineComponent({
  name: 'HeaderComponent',
  setup() {
    const authStore = useAuthStore()

    const { user, isLogin } = storeToRefs(authStore)

    const menus = reactive([...menuItems])

    return {
      menus,
      user,
      isLogin
    }
  }
})
</script>

<style scoped>
.menu-list > .menu-item {
  @apply px-3 py-1 font-sans mx-2 font-bold;
}

.line-header {
  @apply after:w-[100vw] after:absolute after:left-[calc(-50vw_+_50%)] after:shadow-sm after:shadow-gray-200 md:after:shadow-gray-400 after:inset-0 after:h-full after:bg-theme-light dark:after:bg-theme-dark after:-z-10;
}
</style>
