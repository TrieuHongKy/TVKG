<template>
  <div>
    <div class="flex flex-col-reverse min-h-screen md:flex-row gap-4 md:gap-6 p-2">
      <template v-if="isLoading">
        <lazy-category-job-loading></lazy-category-job-loading>
      </template>
      <template v-else>
        <lazy-category-candidate :candidates="profiles" :meta="meta"></lazy-category-candidate>
      </template>
      <!-- <div class="w-full md:w-[25%]">
        <template v-if="!isLoading">
          <lazy-job-filter></lazy-job-filter>
        </template>
      </div> -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    useHead({
      title: 'Danh Sách Ứng Viên ',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'Candidate List',
          name: 'description',
          content: 'Dùng để hiển thị trang danh sách ứng viên của website'
        }
      ]
    })
    definePageMeta({
      title: 'Candidates List',
      description: 'Candidates List'
      // middleware: 'auth'
    })
    const profileStore = useProfileStore()
    const { isLoading, profiles, meta } = storeToRefs(profileStore)
    const { getProfiles } = profileStore

    onMounted(async () => {
      await getProfiles()
    })

    return {
      profiles,
      meta,
      isLoading
    }
  }
})
</script>

<style scoped></style>
