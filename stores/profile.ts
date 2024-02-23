import axios from 'axios'
import { defineStore } from 'pinia'
import type { Meta } from '~/types/meta'
import type { Profile } from '~/types/profile'
import type { User } from '~/types/user'

export const useProfileStore = defineStore('profile', () => {
  const toast = useToast()
  const config = useRuntimeConfig()
  const profile = ref<Profile | null>(null)
  const profiles = ref<Array<Profile>>([])
  const meta = ref<Meta>()
  const info = ref()
  const isLoading = ref<Boolean>(true)
  const isOwnerProfile = ref<Boolean>(false)

  const setInfo = async (data: any) => {
    info.value = data
  }

  const getProfiles = async () => {
    const token = localStorage.getItem('token')
    const res = await axios.get(`${config.public.API_ROOT + config.public.API_PREFIX}/candidates`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (res.status === 200) {
      profiles.value = res.data.result.data
      meta.value = res.data.result.meta
      isLoading.value = false
    }
  }

  const paginateCandidates = async (page: number) => {
    const token = localStorage.getItem('token')
    const res = await axios.get(`${config.public.API_ROOT + config.public.API_PREFIX}/candidates?page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (res.status === 200) {
      profiles.value = res.data.result.data
      meta.value = res.data.result.meta
      isLoading.value = false
    }
  }

  const getCandidateById = async (id: number) => {
    console.log('===ID===', id)

    const token = localStorage.getItem('token')
    const res = await axios.get(`${config.public.API_ROOT + config.public.API_PREFIX}/candidates/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    profile.value = res.data.result
  }

  const updateProfile = async (id: number, data: Profile) => {
    const token = localStorage.getItem('token')
    const res = await axios.put(`${config.public.API_ROOT + config.public.API_PREFIX}/candidates/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (res.status === 200) {
      console.log('res: ', res.data.result)
      isLoading.value = false
      return true
    }
  }

  const updateInfo = async (id: number, data: User) => {
    const token = localStorage.getItem('token')
    const res = await axios.put(`${config.public.API_ROOT + config.public.API_PREFIX}/users/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (res.status === 200) {
      await setInfo(res.data.result)
      isLoading.value = false
      toast.add({
        title: 'Cập nhật thông tin thành công',
        icon: 'i-heroicons-check-circle-solid',
        timeout: 2000
      })
    }
  }

  return {
    profile,
    profiles,
    meta,
    info,
    isLoading,
    isOwnerProfile,
    getProfiles,
    paginateCandidates,
    setInfo,
    updateInfo,
    getCandidateById,
    updateProfile
  }
})
