<script lang="ts">
import { userMenus } from '~/apis/mock-data/menus'

export default defineComponent({
  name: 'UserDropdown',
  setup(props) {
    const myAuth = useAuthStore()

    const { user } = storeToRefs(myAuth)
    const menu = ref([...userMenus])
    // const user = {
    //   name: 'Nguyen Huu Thoai',
    //   avatar:
    //     'https://images.unsplash.com/photo-1682686580950-960d1d513532?auto=format&fit=crop&q=80&w=1887&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    // }

    return {
      menu,
      user
    }
  }
})
</script>

<template>
  <UDropdown
    :items="menu"
    :ui="{ item: { disabled: 'cursor-text select-text' } }"
    :popper="{ placement: 'bottom-start' }"
  >
    <user-card :user="user"></user-card>

    <template #item="{ item }">
      <nuxt-link :class="'w-full border-b last:border-none flex justify-between items-center'" :to="item.link">
        <span class="truncate">{{ item.label }}</span>

        <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto" />
      </nuxt-link>
    </template>
  </UDropdown>
</template>
