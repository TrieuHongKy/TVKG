import { defineStore } from 'pinia'
import axios from 'axios'
import type { Language } from '~/types/language'

export const useLanguageStore = defineStore('language', () => {
  const config = useRuntimeConfig()
  const languages = ref<Array<Language>>([])

  const getLanguages = async () => {
    const res = await axios.get(`${config.public.API_ROOT + config.public.API_PREFIX}/languages`, {
      headers: {}
    })

    if (res.status === 200) {
      languages.value = res.data.result.data
    }
  }

  return {
    languages,
    getLanguages
  }
})
