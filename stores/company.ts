import axios from 'axios'
import { defineStore } from 'pinia'
import type { Company } from '~/types/job'
import type { Meta } from '~/types/meta'
import type { Company as CompanyJob } from '~/types/company'

export const useCompanyStore = defineStore('company', () => {
  const config = useRuntimeConfig()
  const companies = ref<Array<Company> | Array<CompanyJob>>([])
  const company = ref<Company | null>(null)
  const isLoading = ref<Boolean>(true)
  const isLoadingPost = ref<Boolean>(true)
  const meta = ref<Meta>()
  const jobsByCompany = ref()

  const postStore = usePostStore()
  const postsByCompany = ref()

  const setCompany = async (data: Company) => {
    company.value = data
  }

  const getCompanyByUserId = async (id: Number) => {
    isLoading.value = true
    const res = await axios.get(`${config.public.API_ROOT + config.public.API_PREFIX}/companies/user/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    if (res.status === 200) {
      await setCompany(res.data.result)
      isLoading.value = false
    }
  }

  const getCompany = async (slug: string) => {
    const res = await axios.get(`${config.public.API_ROOT + config.public.API_PREFIX}/companies/${slug}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    if (res.status === 200) {
      await setCompany(res.data.result)
      isLoading.value = false
    }
  }

  const getCompanies = async () => {
    const res = await axios.get(`${config.public.API_ROOT + config.public.API_PREFIX}/companies`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    if (res.status === 200) {
      companies.value = res.data.result.data
      meta.value = res.data.result.meta
    }
  }

  const getJobsByCompany = async (id: number) => {
    const res = await axios.get(`${config.public.API_ROOT + config.public.API_PREFIX}/companies/${id}/jobs`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    if (res.status === 200) {
      jobsByCompany.value = res.data.result
    }
  }

  const getPostsByCompany = async (id: number) => {
    isLoadingPost.value = true
    const res = await axios.get(`${config.public.API_ROOT + config.public.API_PREFIX}/companies/${id}/posts`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    if (res.status === 200) {
      postsByCompany.value = res.data.result
      isLoadingPost.value = false
    }
  }

  const getPostsAndCheckLike = async (userId: any) => {
    const updatedPosts = await Promise.all(
      postsByCompany.value.map(async (post: any) => {
        const isLiked = await postStore.checkLikePost(userId, post.id)
        return {
          ...post,
          isLiked
        }
      })
    )

    postsByCompany.value = updatedPosts
  }

  const getCompanyWithJobs = async () => {
    const res = await axios.get(`${config.public.API_ROOT + config.public.API_PREFIX}/company-with-jobs`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    if (res.status === 200) {
      companies.value = res.data.result.data
      meta.value = res.data.result.meta
      isLoading.value = false
    }
  }

  const paginateCompanies = async (page: Number) => {
    const res = await axios.get(`${config.public.API_ROOT + config.public.API_PREFIX}/company-with-jobs?page=${page}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    if (res.status === 200) {
      companies.value = res.data.result.data
      meta.value = res.data.result.meta
    }
  }

  return {
    isLoadingPost,
    company,
    companies,
    meta,
    isLoading,
    jobsByCompany,
    postsByCompany,
    setCompany,
    getCompany,
    getCompanyByUserId,
    getCompanies,
    paginateCompanies,
    getJobsByCompany,
    getPostsByCompany,
    getCompanyWithJobs,
    getPostsAndCheckLike
  }
})
