<template>
  <nav class="flex w-full flex-row-reverse justify-between md:justify-start md:flex-row items-center gap-2">
    <div class="menu__btn inline-block md:hidden">
      <UButton
        :icon="stateMenu ? 'i-heroicons-x-mark' : 'i-heroicons-bars-3'"
        color="gray"
        size="xl"
        class="border-none shadow-none outline-none ring-0"
        @click="toggleMenu"
      >
      </UButton>
    </div>
    <ul
      class="nav__list ct-bg-menu"
      :class="{
        'opacity-100 visible overflow-hidden': stateMenu,
        'opacity-0 invisible md:opacity-100 md:visible': !stateMenu
      }"
    >
      <div class="block md:hidden">
        <UserAccordion></UserAccordion>
      </div>
      <template v-for="(menu, index) in filteredMenu" :key="index">
        <UAccordion v-if="menu.multiLevel" :items="[menu]" :ui="{ wrapper: 'flex flex-col w-full' }">
          <template #default="{ item, open }">
            <UButton
              color="gray"
              variant="ghost"
              class="border-t border-gray-200 dark:border-gray-700"
              :ui="{ rounded: 'rounded-none', padding: { sm: 'p-3' } }"
            >
              <span class="truncate text-lg">{{ item.label }}</span>
              <template #trailing>
                <UIcon
                  name="i-heroicons-chevron-right"
                  class="w-5 h-5 ms-auto transform transition-transform duration-200"
                  :class="[open && 'rotate-90']"
                />
              </template>
            </UButton>
          </template>
          <template v-for="(item, ind) in filteredMenu" :key="ind" #[item.slot]>
            <div class="flex flex-col gap-4 text-base px-4">
              <template v-for="(menu, id) in item.submenu" :key="id">
                <ul class="megamenu__content">
                  <nuxt-link :to="menu.link" class="megamenu__item">
                    <div class="megamenu__icon">
                      <UIcon class="text-5xl" :name="menu.icon"></UIcon>
                    </div>
                    <div class="megamenu__link">
                      <p>{{ menu.label }}</p>
                      <span class="megamenu_desc"> {{ menu.desc }} </span>
                    </div>
                  </nuxt-link>
                </ul>
              </template>
            </div>
          </template>
        </UAccordion>
        <nuxt-link v-else :to="menu.link" class="w-full">
          <UButton
            color="gray"
            variant="ghost"
            class="block w-full text-left border-t truncate border-gray-200 dark:border-gray-700"
            :ui="{ rounded: 'rounded-none', padding: { sm: 'p-3' } }"
          >
            <span class="text-lg"> {{ menu.label }}</span>
          </UButton>
        </nuxt-link>
      </template>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { menuItems } from '~/apis/mock-data/menus'
import { slugify } from '~/utils/formatter'

export default defineComponent({
  name: 'DefaultLayout',
  props: ['menus'],
  setup() {
    const stateMenu = ref(false)
    const activeMenuIndex = ref(-1)

    const toggleMenu = () => {
      stateMenu.value = !stateMenu.value
    }

    const user = {
      name: 'Nguyen Huu Thoai',
      avatar:
        'https://images.unsplash.com/photo-1682686580950-960d1d513532?auto=format&fit=crop&q=80&w=1887&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    }

    const toggleMegaMenu = (index: number) => {
      if (process.client && window.innerWidth < 768) {
        activeMenuIndex.value = activeMenuIndex.value === index ? -1 : index
      }
    }

    const menuData = ref([...menuItems])
    const filteredMenu = computed(() => {
      return menuData.value.map((i) => {
        if (i?.submenu) {
          return {
            ...i,
            defaultOpen: false,
            slot: slugify(i.label),
            multiLevel: true
          }
        } else {
          return { ...i, slot: '', multiLevel: false }
        }
      })
    })

    return {
      stateMenu,
      toggleMenu,
      user,
      activeMenuIndex,
      toggleMegaMenu,
      filteredMenu
    }
  }
})
</script>
<style scoped>
.nav__list {
  @apply absolute md:static h-fit top-full p-2 left-0 w-full flex flex-col md:flex-row overflow-x-hidden list-none;
}
.ct-bg-menu {
  @apply after:fixed md:after:absolute md:after:h-fit after:bg-theme-light after:top-0 dark:after:bg-theme-dark after:w-screen after:left-[calc(-50vw_+_50%)] after:h-screen after:-z-10 after:p-4 after:shadow-md;
}
.nav__item {
  @apply mx-1.5 py-2 md:py-4 cursor-pointer w-full md:w-auto text-lg md:text-base;
}
.nav__link {
  @apply block text-tertiary dark:text-tertiary-light group-hover:text-primary cursor-pointer;
}
.dropdown__link {
  @apply flex items-center justify-between pr-4 md:pr-0;
}

.megamenu {
  @apply static md:absolute flex flex-wrap w-full left-0 top-full p-0 md:p-4 md:h-auto justify-start shadow-none md:shadow-lg -z-20 md:opacity-0 md:invisible md:translate-y-4 overflow-hidden md:overflow-visible transition-none md:transition-all duration-300 ease-in-out;
}

.ct-bg {
  @apply after:absolute after:bg-theme-light after:top-0 dark:after:bg-theme-dark after:w-screen after:left-[calc(-50vw_+_50%)] after:h-full after:-z-50 after:p-4 after:shadow-md;
}

.megamenu__content {
  @apply flex basis-full w-full md:w-1/3 md:basis-1/3 items-center justify-center;
}

.megamenu__item {
  @apply flex items-center w-full p-2 md:p-4 gap-2 rounded-md hover:bg-secondary-light/40;
}

.megamenu__link {
  @apply flex flex-col justify-center;
}

.megamenu__icon {
  @apply w-8 h-8 rounded-sm p-1 flex items-center justify-center;
}

.megamenu_desc {
  @apply text-sm text-tertiary/60 dark:text-tertiary-light/60;
}
</style>
