<template>
  <UAccordion :items="items" :ui="{ wrapper: 'flex flex-col w-full' }">
    <template #default="{ open }">
      <UButton color="gray" class="py-2 shadow-none border-none ring-0">
        <user-card :user="user"></user-card>
        <template #trailing>
          <UIcon
            name="i-heroicons-chevron-right"
            class="w-5 h-5 text-tertiary dark:text-tertiary-light ms-auto transform transition-transform duration-200"
            :class="[open && 'rotate-90']"
          />
        </template>
      </UButton>
    </template>
    <template #user-accordion>
      <div class="flex flex-col gap-4 text-base px-4">
        <template v-for="(item, index) in menu" :key="index">
          <div class="flex items-center justify-between">
            <nuxt-link :to="item.link">{{ item.label }}</nuxt-link>
            <UIcon class="text-xl" :name="item.icon"></UIcon>
          </div>
        </template>
      </div>
    </template>
  </UAccordion>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {userMenus} from '~/apis/mock-data/menus'

export default defineComponent({
  setup() {
    const menu = ref([...userMenus][0])
    const items = [
      {
        icon: 'i-heroicons-information-circle',
        defaultOpen: false,
        slot: 'user-accordion'
      }
    ]

    const user = {
      name: 'Nguyen Huu Thoai',
      avatar: 'https://i.pravatar.cc/150?img=3'
    }
    return {
      items,
      menu,
      user
    }
  }
})
</script>

<style scoped></style>
