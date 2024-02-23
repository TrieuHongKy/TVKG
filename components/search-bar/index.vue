<template>
  <div class="w-full relative h-fit search__bar--bg py-2">
    <div class="search__bar py-4 md:py-0 flex justify-center items-center gap-2 md:gap-4">
      <div class="search__item">
        <UInput
          v-model="keyword"
          icon="i-heroicons-briefcase-20-solid"
          placeholder="Tiêu đề công việc, vị trí..."
          size="xl"
          color="white"
          :trailing="false"
        />
      </div>
      <div class="search__item hidden md:block">
        <USelectMenu
          v-model="major"
          icon="i-heroicons-briefcase-20-solid"
          :searchable="majors"
          :options="majors"
          placeholder="Lọc theo ngành nghề"
          searchable-placeholder="Tìm kiếm ngành nghề..."
          size="xl"
          option-attribute="name"
          @change="findJobs"
        >
          <template #option="{ option: m }">
            <span class="truncate">{{ m.name }}</span>
          </template>
          <template #option-empty="{ query }">
            <q>{{ query }}</q> không tồn tại
          </template>
        </USelectMenu>
      </div>
      <div class="search__item hidden md:block">
        <USelectMenu
          v-model="province"
          icon="i-heroicons-briefcase-20-solid"
          :searchable="provinces"
          :options="provinces"
          placeholder="Lọc theo địa điểm"
          searchable-placeholder="Tìm kiếm địa điểm..."
          size="xl"
          option-attribute="name"
          @change="findJobs"
        >
          <template #option="{ option: m }">
            <span class="truncate">{{ m.name }}</span>
          </template>
          <template #option-empty="{ query }">
            <q>{{ query }}</q> không tồn tại
          </template>
        </USelectMenu>
      </div>
      <div class="search__btn flex justify-end">
        <UButton
          label="Tìm"
          icon="i-heroicons-magnifying-glass"
          size="xl"
          color="primary"
          variant="solid"
          :trailing="true"
          @click="routeName === 'search' ? findJobs() : findJobsHome()"
        />
      </div>
    </div>
    <div class="search__advanced w-full">
      <UAccordion color="primary" :items="items" :ui="{ wrapper: 'flex flex-col w-full' }">
        <template #default="{ item, open }">
          <UButton
            color="secondary"
            variant="ghost"
            class="border-b border-gray-200 dark:border-gray-300 text-theme-light -mt-2 p-0 py-2"
            :ui="{ rounded: 'rounded-none', padding: { sm: 'p-3' } }"
          >
            <span class="truncate capitalize">{{ item.label }}</span>
            <template #trailing>
              <UIcon
                name="i-heroicons-chevron-right-20-solid"
                class="w-5 h-5 ms-auto transform transition-transform duration-200"
                :class="[open && 'rotate-90']"
              />
            </template>
          </UButton>
        </template>
        <template #search-advanced>
          <div class="search__bar flex flex-col md:flex-row justify-between items-center gap-1 md:gap-4">
            <div class="w-full md:w-1/3 basis-full md:basis-1/3">
              <USelectMenu
                v-model="category"
                placeholder="Lọc theo danh mục"
                searchable-placeholder="Tìm kiếm danh mục..."
                :searchable="categories"
                :options="categories"
                size="xl"
                option-attribute="name"
                @change="findJobs"
              >
                <template #option="{ option: cate }">
                  <span class="truncate">{{ cate.name }}</span>
                </template>
                <template #option-empty="{ query }">
                  <q>{{ query }}</q> không tồn tại
                </template>
              </USelectMenu>
            </div>
            <div class="w-full md:w-1/3 basis-full md:basis-1/3">
              <USelectMenu
                v-model="jobType"
                placeholder="Lọc theo loại công việc"
                searchable-placeholder="Tìm kiếm loại công việc..."
                :searchable="jobTypes"
                :options="jobTypes"
                size="xl"
                option-attribute="name"
                @change="findJobs"
              >
                <template #option="{ option: type }">
                  <span class="truncate">{{ type.name }}</span>
                </template>
                <template #option-empty="{ query }">
                  <q>{{ query }}</q> không tồn tại
                </template>
              </USelectMenu>
            </div>
            <div class="w-full md:w-1/3 basis-full md:basis-1/3">
              <USelectMenu
                v-model="salary"
                :options="salaries"
                :searchable="salaries as any"
                searchable-placeholder="Tìm kiếm mức lương..."
                placeholder="Lọc theo mức lương"
                option-attribute="name"
                size="xl"
                @change="findJobs"
              >
                <template #option="{ option: sal }">
                  <span class="truncate">{{ sal.name }}</span>
                </template>
                <template #option-empty="{ query }">
                  <q>{{ query }}</q> không tồn tại
                </template>
              </USelectMenu>
            </div>
            <div class="w-full md:w-1/3 basis-full md:basis-1/3">
              <USelectMenu
                v-model="experience"
                :searchable="experiences"
                :options="experiences"
                placeholder="Lọc theo kinh nghiệm"
                searchable-placeholder="Tìm kiếm kinh nghiệm..."
                size="xl"
                option-attribute="name"
                @change="findJobs"
              >
                <template #option="{ option: exp }">
                  <span class="truncate">{{ exp.name }}</span>
                </template>
                <template #option-empty="{ query }">
                  <q>{{ query }}</q> không tồn tại
                </template>
              </USelectMenu>
            </div>
          </div>
        </template>
      </UAccordion>
    </div>
    <div class="w-full basis-full flex items-center justify-end">
      <span class="cursor-pointer text-tertiary-light hover:underline text-lg py-0.5 px-4" @click="formReset"
        >Hủy bộ lọc</span
      >
    </div>
  </div>
</template>

<script lang="ts">
import { useAddressStore } from '~/stores/address'
import { useCategoryStore } from '~/stores/category'
import { useSearchStore } from '~/stores/search'

export default defineComponent({
  setup() {
    const searchStore = useSearchStore()
    const { search, category, jobType, keyword, major, province, experience, salary } = storeToRefs(searchStore)
    const { updateSearch } = searchStore
    const jobStore = useJobStore()
    const addressStore = useAddressStore()
    const { provinces, districts, wards } = storeToRefs(addressStore)
    const experienceStore = useExperienceStore()
    const categoryStore = useCategoryStore()
    const jobTypeStore = useJobTypeStore()
    const { jobTypes } = storeToRefs(jobTypeStore)
    const { experiences } = storeToRefs(experienceStore)
    const majorStore = useMajorStore()
    const { majors } = storeToRefs(majorStore)
    const { categories } = storeToRefs(categoryStore)
    const router = useRouter()
    const routeName = computed(() => {
      return router.currentRoute.value.name
    })

    const salaries = ref([
      {
        id: 1,
        name: 'Dưới 3 triệu',
        value: '0-2999000'
      },
      {
        id: 2,
        name: '3 - 5 triệu',
        value: '3000000-5000000'
      },
      {
        id: 3,
        name: '5 - 7 triệu',
        value: '5000000-7000000'
      },
      {
        id: 4,
        name: '7 - 10 triệu',
        value: '7000000-10000000'
      },
      {
        id: 5,
        name: '10 - 12 triệu',
        value: '10000000-12000000'
      },
      {
        id: 6,
        name: '12 - 15 triệu',
        value: '12000000-15000000'
      },
      {
        id: 7,
        name: '15 - 20 triệu',
        value: '15000000-20000000'
      },
      {
        id: 8,
        name: '20 - 25 triệu',
        value: '20000000-25000000'
      },
      {
        id: 9,
        name: '25 - 30 triệu',
        value: '25000000-30000000'
      },
      {
        id: 10,
        name: 'Trên 30 triệu',
        value: '30000000'
      }
    ])

    const items = [
      {
        label: 'Tìm kiếm nâng cao',
        icon: 'i-heroicons-information-circle',
        defaultOpen: false,
        slot: 'search-advanced'
      }
    ]

    onMounted(async () => {
      await experienceStore.getExperiences()
      await categoryStore.getCategories()
      await majorStore.getMajors()
      await jobTypeStore.getJobTypes()
      await addressStore.getProvinces()
    })

    const findJobsHome = async () => {
      const req = {
        keyword: keyword.value,
        salary: salary.value?.value,
        province: province.value?.id,
        category: category.value?.id,
        major: major.value?.id,
        jobType: jobType.value?.id,
        experience: experience.value?.id
      }
      await updateSearch(req as any)
      await navigateTo('/search')
    }

    const findJobs = async () => {
      const req = {
        keyword: keyword.value,
        salary: salary.value?.value,
        province: province.value?.id,
        category: category.value?.id,
        major: major.value?.id,
        jobType: jobType.value?.id,
        experience: experience.value?.id
      }

      await jobStore.search(req as any)
    }

    const formReset = async () => {
      keyword.value = ''
      category.value = null
      province.value = null
      major.value = null
      jobType.value = null
      experience.value = null
      salary.value = null
      const req = {
        keyword: keyword.value,
        salary: salary.value?.value,
        province: province.value?.id,
        category: category.value?.id,
        major: major.value?.id,
        jobType: jobType.value?.id,
        experience: experience.value?.id
      }
      await jobStore.search(req as any)
    }

    const selected = ref()
    const selectedJob = ref()
    return {
      selected,
      keyword,
      provinces,
      province,
      findJobs,
      findJobsHome,
      salary,
      salaries,
      jobType,
      jobTypes,
      routeName,
      category,
      categories,
      major,
      majors,
      experience,
      experiences,
      formReset,
      selectedJob,
      search,
      items
    }
  }
})
</script>

<style scoped>
.search__item {
  @apply py-2 basis-full md:basis-1/3;
}
.search__bar--bg {
  @apply after:w-screen after:absolute after:inset-0 after:left-[calc(-50vw_+_50%)] after:h-full after:bg-secondary dark:after:bg-secondary after:z-[-1];
}
</style>
