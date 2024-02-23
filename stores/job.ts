import axios from 'axios'
import { defineStore } from 'pinia'
import type { Job } from '~/types/job'
import type { Meta } from '~/types/meta'

interface Search {
  keyword: String
  province: number
  category: number
  salary: number
  major: number
  jobType: number
  experience: number
}

export const useJobStore = defineStore('job', () => {
  const toast = useToast()

  const config = useRuntimeConfig()
  const jobs = ref<Array<Job>>([])
  const job = ref<Job | null>(null)
  const meta = ref<Meta | null>(null)
  const isLoading = ref<Boolean>(true)
  const jobSearch = ref<Array<Job>>([])
  const metaSearch = ref<Meta | null>(null)

  const getJobs = async () => {
    const res = await axios.get(`${config.public.API_ROOT + config.public.API_PREFIX}/jobs`)
    if (res.status === 200) {
      jobs.value = res.data.result.data
      meta.value = res.data.result.meta
      isLoading.value = false
    }
  }

  const findJobById = async (id: number) => {
    const res = await axios.get(`${config.public.API_ROOT + config.public.API_PREFIX}/jobs/${id}`)
    if (res.status === 200) {
      job.value = res.data.result
      isLoading.value = false
    }
  }

  const getJobsByCategory = async (slug: String) => {
    const token = localStorage.getItem('token')
    const res = await axios.get(`${config.public.API_ROOT + config.public.API_PREFIX}/jobs/category/${slug}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (res.status === 200) {
      jobs.value = res.data.result.data
      meta.value = res.data.result.meta
      isLoading.value = false
    }
  }

  const paginateJobs = async (page: number) => {
    // isLoading.value = true
    const token = localStorage.getItem('token')
    const res = await axios.get(`${config.public.API_ROOT + config.public.API_PREFIX}/jobs?page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (res.status === 200) {
      jobs.value = res.data.result.data
      meta.value = res.data.result.meta
      isLoading.value = false
    }
  }

  const search = async (req: Search) => {
    // isLoading.value = true
    const token = localStorage.getItem('token')
    const res = await axios.get(`${config.public.API_ROOT + config.public.API_PREFIX}/jobs-search`, {
      params: {
        keyword: req.keyword,
        province: req.province,
        category: req.category,
        salary: req.salary,
        major: req.major,
        jobType: req.jobType,
        experience: req.experience
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (res.status === 200) {
      jobSearch.value = res.data.result.data
      metaSearch.value = res.data.result.meta
      isLoading.value = false
    }
  }

  const savedJob = async (candidate_id: any, job_id: any) => {
    const res = await axios.post(`${config.public.API_ROOT + config.public.API_PREFIX}/saved_job`, {
      candidate_id,
      job_id
    })
    if (res.status === 201) {
      toast.add({
        title: 'Thích bài viết thành công',
        icon: 'i-heroicons-check-circle-solid',
        timeout: 2000
      })
    }
    if (res.status === 200) {
      toast.add({
        title: 'Bỏ thích bài viết thành công',
        icon: 'i-heroicons-check-circle-solid',
        timeout: 2000
      })
    }
  }

  const checkSavedJob = async (candidate_id: any, job_id: any) => {
    const res = await axios.get(
      `${config.public.API_ROOT + config.public.API_PREFIX}/saved_job/saved_check/${candidate_id}/${job_id}`
    )
    if (res.status === 200) {
      return true
    }

    return false
  }

  const getJobsAndCheckSaved = async (candidate_id: any) => {
    const updatedJobs = await Promise.all(
      jobs.value.map(async (job: any) => {
        const isLiked = await checkSavedJob(candidate_id, job.id)
        return {
          ...job,
          isLiked
        }
      })
    )

    jobs.value = updatedJobs
  }

  // const getJobsByCategory = () =>

  return {
    jobs,
    job,
    jobSearch,
    metaSearch,
    meta,
    isLoading,
    search,
    paginateJobs,
    getJobs,
    findJobById,
    getJobsByCategory,
    savedJob,
    checkSavedJob,
    getJobsAndCheckSaved
  }
})
