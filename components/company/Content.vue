<template>
  <div class="content__company--content">
    <lazy-company-header :company="company"></lazy-company-header>
    <div class="flex items-center justify-center gap-4 md:gap-2">
      <p
        class="content__company--tab"
        :class="
          openTabCompany === 1
            ? 'text-primary border-b-2 border-primary'
            : 'text-gray-600 hover:text-primary dark:text-white dark:hover:text-primary'
        "
        @click="toggleTabsCompany(1)"
      >
        Thông Tin
      </p>
      <div class="w-[2px] bg-gray-400 py-3"></div>
      <p
        class="content__company--tab"
        :class="
          openTabCompany === 2
            ? 'text-primary border-b-2 border-primary'
            : 'text-gray-600 hover:text-primary dark:text-white dark:hover:text-primary'
        "
        @click="toggleTabsCompany(2)"
      >
        Bài Viết
      </p>
    </div>
    <div v-if="openTabCompany === 1" class="flex flex-col gap-4">
      <div class="content__company--bottom company__section">
        <p class="text-lg font-semibold">Việc làm đang tuyển dụng</p>
        <div class="flex flex-col gap-4 p-2">
          <company-job :jobs="jobsByCompany"></company-job>
        </div>
      </div>
      <div class="content__company--bottom company__section">
        <p class="text-lg font-semibold">Giới thiệu công ty</p>
        <p class="text-base dark:text-tertiary-light/80 px-2">
          {{ company?.description }}
        </p>
      </div>
    </div>
    <div v-if="openTabCompany === 2">
      <div class="flex flex-row gap-4">
        <div class="w-[30%] hidden sm:block">
          <lazy-company-card :name="company?.company_name" :avatar="company?.company_logo"></lazy-company-card>
        </div>
        <div class="w-full sm:w-[70%]">
          <template v-if="loadingPost">
            <post-loading></post-loading>
          </template>
          <template v-else>
            <lazy-company-posts :posts="postsByCompany" :company="company"></lazy-company-posts>
          </template>
        </div>
      </div>
      <!-- <div v-else class="flex justify-center w-full pt-2">
        <p class="text-gray-500 text-xl">Doanh nghiệp này hiện chưa có bài viết nào được đăng tải</p>
      </div> -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { Company } from '~/types/job'

export default defineComponent({
  props: {
    loadingPost: {
      type: Boolean,
      default: true
    },
    company: {
      type: Object,
      default: () => ({}) as Company
    }
  },
  async setup(props) {
    const { company } = props
    const openTabCompany = ref(1)
    const companyStore = useCompanyStore()
    const { jobsByCompany, postsByCompany } = storeToRefs(companyStore)
    console.log(postsByCompany)

    // const { postsByCompany } = storeToRefs(companyStore)

    const toggleTabsCompany = (tabNumber: number) => {
      openTabCompany.value = tabNumber
    }

    onMounted(async () => {
      // await companyStore.getJobsByCompany(company?.id)
    })

    return {
      // idPost,
      jobsByCompany,
      postsByCompany,
      openTabCompany,
      toggleTabsCompany
    }
  }
})
</script>

<style scoped>
.content__company--content {
  @apply w-full h-full flex flex-col gap-4;
}
.content__company--bottom {
  @apply flex flex-col gap-4;
}
.content__company--tab {
  @apply w-auto sm:w-[20%] text-center font-semibold text-lg py-2 cursor-pointer;
}
</style>
