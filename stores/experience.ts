import axios from 'axios'
import { defineStore } from 'pinia'

export const useExperienceStore = defineStore('experience', () => {
  const config = useRuntimeConfig()
  const experiences = ref()

  const getExperiences = async () => {
    const res = await axios.get(`${config.public.API_ROOT + config.public.API_PREFIX}/experiences`)

    if (res.status === 200) {
      experiences.value = res.data.result.data
    }
  }

  return {
    experiences,
    getExperiences
  }
})
