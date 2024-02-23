<template>
  <div class="w-full">
    <div class="min-h-[1228px] sm:min-h-[694px]">
      <div class="grid grid-cols-2 gap-4 p-4">
        <p class="col-span-2 text-sm font-semibold flex items-center gap-1">
          <UIcon name="i-heroicons-briefcase" class="text-base"></UIcon>
          Đã tìm thấy {{ candidates.length }} trong số {{ meta?.total }} hồ sơ ứng viên
        </p>
        <nuxt-link
          v-for="profile in candidates as Array<Profile>"
          :key="profile?.id"
          :to="`/profile/${profile?.user?.id}`"
          class="col-span-2 sm:col-span-1 ct-card"
        >
          <div
            class="flex flex-row items-center gap-2 md:gap-4 p-2 md:p-4 shadow-md hover:shadow-lg rounded-md dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            <UAvatar :src="profile?.user?.image" :alt="profile?.user?.name" size="3xl" />
            <div class="flex flex-col gap-1">
              <div class="flex items-center gap-1 font-semibold text-green-600 hover:text-primary">
                {{ profile?.user?.name }}
              </div>
              <div class="flex items-center gap-1">
                <UIcon name="i-heroicons-star"></UIcon>
                <div class="hover:text-primary">
                  {{ profile?.major?.name }}
                </div>
              </div>
              <div class="grid grid-cols-2 gap-2 justify-between">
                <p class="flex items-center gap-1 text-sm">
                  <UIcon name="i-heroicons-currency-dollar"></UIcon>
                  7 - 15 triệu
                </p>
                <p class="flex items-center gap-1 text-sm">
                  <UIcon name="i-heroicons-clock"></UIcon>
                  <!-- {{ new Date(profile.timeStamp).toLocaleTimeString() }}
                  {{ profile.timeStamp }} -->
                  3 phút trước
                </p>
              </div>
            </div>
          </div>
        </nuxt-link>
      </div>
    </div>
    <div class="flex justify-center pt-4">
      <UPagination v-model="curr_page" size="md" :page-count="meta?.per_page" :total="meta?.total" />
    </div>
  </div>
</template>

<script lang="ts">
import type { Meta } from '~/types/meta'
import type { Profile } from '~/types/profile'

export default defineComponent({
  props: {
    candidates: {
      type: Array,
      default: () => [] as Array<Profile>
    },
    meta: {
      type: Object,
      default: () => ({}) as Meta
    }
  },
  setup(props) {
    const curr_page = ref()
    const paginateCandidates = useProfileStore().paginateCandidates

    onMounted(async () => {
      curr_page.value = props.meta?.current_page
    })

    watch(curr_page, async (value) => {
      await paginateCandidates(value)
    })

    return { curr_page }
  }
})
</script>

<style scoped></style>
