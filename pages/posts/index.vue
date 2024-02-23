<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="flex flex-col-reverse sm:flex-row gap-8">
    <div class="w-full sm:w-3/5 md:w-3/4">
      <template v-if="isLoadingPost">
        <post-loading></post-loading>
      </template>
      <template v-else>
        <lazy-company-posts :posts="allPost" :company="companies"></lazy-company-posts>
      </template>
    </div>
    <div class="w-full sm:w-2/5 md:w-1/4"><category></category></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup(props, { emit }) {
    const postStore = usePostStore()

    const { getPost } = postStore
    const { allPost, isLoadingPost } = storeToRefs(postStore)
    const companyStore = useCompanyStore()

    const { companies } = storeToRefs(companyStore)
    console.log(companies)
    const { getCompanies } = companyStore

    onMounted(async () => {
      await getPost()
      await getCompanies()
      // await getCompany(company.slug as any)
    })

    return {
      isLoadingPost,
      companies,
      allPost
    }
  }
})
</script>

<style scoped></style>
