import axios from 'axios'
import { defineStore } from 'pinia'

export const useJobTypeStore = defineStore('jobType', () => {
  const config = useRuntimeConfig()
  const jobTypes = ref()

  const getJobTypes = async () => {
    const res = await axios.get(`${config.public.API_ROOT + config.public.API_PREFIX}/job-types`)
    if (res.status === 200) {
      jobTypes.value = res.data.result.data
    }
  }
  return {
    jobTypes,
    getJobTypes
  }
})
