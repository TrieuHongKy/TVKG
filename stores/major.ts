import { defineStore } from 'pinia'
import axios from 'axios'

export const useMajorStore = defineStore('major', () => {
  const config = useRuntimeConfig()
  const majors = ref()

  const getMajors = async () => {
    const res = await axios.get(`${config.public.API_ROOT + config.public.API_PREFIX}/majors`)
    if (res.status === 200) {
      majors.value = res.data.result.data
    }
  }

  return {
    majors,
    getMajors
  }
})
