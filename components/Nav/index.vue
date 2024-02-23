<template>
  <nav
    class="flex w-full flex-row-reverse justify-between md:justify-start md:flex-row items-center gap-2 overflow-y-auto h-screen md:h-auto"
  >
    <div class="hidden md:block">
      <header-logo></header-logo>
    </div>
    <div class="menu__btn inline-block md:hidden">
      <UButton @click="toggleMenu">
        <UIcon name="i-heroicons-bars-3-20-solid" />
      </UButton>
    </div>
    <ul
      class="nav__list ct-bg-menu"
      :class="{
        'opacity-100 visible': stateMenu,
        'opacity-0 invisible md:opacity-100 md:visible': !stateMenu
      }"
    >
      <div class="block md:hidden">
        <UserAccordion></UserAccordion>
      </div>
      <template v-for="(menu, index) in menus" :key="index">
        <li v-if="menu.submenu" class="nav__item dropdown group">
          <div class="nav__link dropdown__link" @click="toggleMegaMenu(index)">
            {{ menu.label }}
            <span
              class="dropdown-icon ml-1 transition-transform duration-200 md:group-hover:rotate-180 md:group-hover:text-primary flex items-center justify-center"
              :class="{ 'rotate-180 text-primary': activeMenuIndex === index }"
            >
              <UIcon name="i-heroicons-chevron-down" />
            </span>
          </div>
          <div
            class="megamenu group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 ct-bg"
            :class="{
              'h-full': activeMenuIndex === index,
              'h-0 md:h-full': activeMenuIndex !== index
            }"
          >
            <template v-for="(submenu, index) in menu.submenu" :key="index">
              <ul class="megamenu__content">
                <nuxt-link :to="submenu.link" class="megamenu__item">
                  <div class="megamenu__icon">
                    <UIcon class="text-5xl" :name="submenu.icon"></UIcon>
                  </div>
                  <div class="megamenu__link">
                    <p>{{ submenu.label }}</p>
                    <span class="megamenu_desc"> {{ submenu.desc }} </span>
                  </div>
                </nuxt-link>
              </ul>
            </template>
          </div>
        </li>
        <li v-else class="nav__item" :class="menu.hiddenDesk ? 'md:hidden' : ''">
          <nuxt-link :to="menu.link" class="nav__link"> {{ menu.label }} </nuxt-link>
        </li>
      </template>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'DefaultLayout',
  props: ['menus'],
  setup() {
    const stateMenu = ref(false)
    const activeMenuIndex = ref(-1)

    const toggleMenu = () => {
      stateMenu.value = !stateMenu.value
    }

    const user = { name: 'Nguyen Huu Thoai' }

    const toggleMegaMenu = (index: number) => {
      if (process.client && window.innerWidth < 768) {
        activeMenuIndex.value = activeMenuIndex.value === index ? -1 : index
      }
    }

    return {
      stateMenu,
      toggleMenu,
      user,
      activeMenuIndex,
      toggleMegaMenu
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
