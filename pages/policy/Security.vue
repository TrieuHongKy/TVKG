<script lang="ts">
import { defineComponent } from 'vue'
import { sercurity } from '~/apis/mock-data/privacy'

export default defineComponent({
  setup() {
    return { sercurity }
  }
})
</script>

<template>
  <section class="privacy_policy flex justify-center items-center p-2">
    <div class="container mx-auto flex justify-center items-center">
      <div class="width-policy">
        <p class="title-policy">Chính Sách Quyền Riêng Tư</p>
        <UAccordion multiple :items="sercurity" :ui="{ wrapper: 'flex flex-col w-full p-2' }">
          <template #default="{ item, index, open }">
            <UButton
              color="gray"
              variant="ghost"
              class="border-b border-gray-200 dark:border-gray-700"
              :ui="{ rounded: 'rounded-none', padding: { sm: 'p-3' } }"
            >
              <template #leading>
                <div
                  class="w-6 h-6 rounded-full bg-primary-500 dark:bg-primary-400 flex items-center justify-center -my-1"
                >
                  <p class="text-white dark:text-secondary">{{ index + 1 }}</p>
                </div>
              </template>

              <span class="truncate font-semibold">{{ item.label }}</span>

              <template #trailing>
                <UIcon
                  name="i-heroicons-chevron-right-20-solid"
                  class="w-5 h-5 ms-auto transform transition-transform duration-200"
                  :class="[open && 'rotate-90']"
                />
              </template>
            </UButton>
          </template>
        </UAccordion>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
