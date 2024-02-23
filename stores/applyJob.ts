import axios from 'axios'
import {defineStore} from 'pinia'
import type {ApplyJob, STATUS} from '~/types/applyjob'

export const useApplyJobStore = defineStore('applyJob', () => {
  const toast = useToast()
  const config = useRuntimeConfig()
  const status = ref<STATUS>('pending')
  const applied = ref<Boolean>(false)

  const createApplyJob = async (data: ApplyJob) => {
    const token = localStorage.getItem('token')
    const res = await axios.post(`${config.public.API_ROOT + config.public.API_PREFIX}/apply_job`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (res.status === 201) {
      applied.value = true
      return res.data.result
    }
  }

  const alreadyApplied = async (data: any) => {
    applied.value = false
    const token = localStorage.getItem('token')
    const res = await axios.post(
      `${config.public.API_ROOT + config.public.API_PREFIX}/already-applied`,
      {
        job_id: data.job_id,
        candidate_id: data.candidate_id
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    if (res.status === 200) {
      return (applied.value = true)
    }
    applied.value = false
  }

  return {
    status,
    applied,
    createApplyJob,
    alreadyApplied
  }
})
