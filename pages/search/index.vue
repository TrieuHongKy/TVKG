<template>
  <div>
    <SearchBar />
    <div class="flex flex-col-reverse md:flex-row gap-4 p-2">
      <template v-if="isLoading">
        <lazy-category-job-loading></lazy-category-job-loading>
      </template>
      <template v-else>
        <lazy-category-job :jobs="jobSearch" :meta="metaSearch as any"></lazy-category-job>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const searchStore = useSearchStore()
    const jobStore = useJobStore()
    const { jobSearch, metaSearch, isLoading } = storeToRefs(jobStore)
    const { search } = storeToRefs(searchStore)
    onMounted(async () => {
      await jobStore.search(search.value as any)
    })
    return {
      jobSearch,
      metaSearch,
      isLoading
    }
  }
})
</script>

<style scoped></style>
