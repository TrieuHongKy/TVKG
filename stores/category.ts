import axios from 'axios'
import { defineStore } from 'pinia'

export const useCategoryStore = defineStore('category', () => {
  const config = useRuntimeConfig()
  const categories = ref()

  const getCategories = async () => {
    const res = await axios.get(`${config.public.API_ROOT + config.public.API_PREFIX}/categories`)
    if (res.status === 200) {
      categories.value = res.data.result.data
    }
  }
  return {
    categories,
    getCategories
  }
})
