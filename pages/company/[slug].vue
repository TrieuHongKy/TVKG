<template>
  <div class="flex flex-col md:flex-row w-full p-2 gap-4">
    <div class="w-full md:w-[70%] lg:w-[80%]">
      <company-content :loading-post="isLoadingPost" :company="company as any"></company-content>
    </div>
    <div class="w-full md:w-[30%] lg:w-[20%] h-auto">
      <div class="sticky top-20 flex flex-col gap-4">
        <template v-if="isLoading">
          <lazy-company-info-loading></lazy-company-info-loading>
        </template>
        <template v-else>
          <lazy-company-info :company-data="company as any"></lazy-company-info>
        </template>
        <!-- <map-company :map-company="companyDetail?.map"></map-company> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  setup() {
    const { slug } = useRoute().params
    const companyStore = useCompanyStore()

    const { company, isLoading, isLoadingPost } = storeToRefs(companyStore)
    const { getCompany, getJobsByCompany, getPostsByCompany } = companyStore
    console.log(company)

    // const authStore = useAuthStore()
    // const { user } = storeToRefs(authStore)
    // const user_id = user.value?.id
    onMounted(async () => {
      await getCompany(slug as any)

      await getJobsByCompany(company.value?.id as any)

      await getPostsByCompany(company.value?.user?.id as any)
      // await getPostsAndCheckLike(user_id as any)
    })

    return { company, isLoading, isLoadingPost }
  }
})
</script>

<style scoped></style>
