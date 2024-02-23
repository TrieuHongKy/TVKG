import { defineStore } from 'pinia'

interface Search {
  keyword: string
  province: number
  category: number
  salary: string
  major: number
  jobType: number
  experience: number
}

export const useSearchStore = defineStore('search', () => {
  const search = ref<Search>({
    keyword: '',
    province: 0,
    category: 0,
    major: 0,
    jobType: 0,
    experience: 0,
    salary: ''
  })

  const keyword = ref('')
  const category = ref()
  const province = ref()
  const major = ref()
  const jobType = ref()
  const experience = ref()
  const salary = ref()

  const updateSearch = async (req: Search) => {
    search.value = req as Search
  }

  return {
    search,
    keyword,
    category,
    province,
    salary,
    experience,
    major,
    jobType,
    updateSearch
  }
})
