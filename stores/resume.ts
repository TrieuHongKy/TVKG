import axios from 'axios'
import { defineStore } from 'pinia'
import type { Resume } from '~/types/profile'

export const useResumeStore = defineStore('resume', () => {
  const toast = useToast()
  const config = useRuntimeConfig()
  const resume = ref<Resume | null>(null)

  const createResume = async (data: Resume) => {
    const res = await axios.post(`${config.public.API_ROOT + config.public.API_PREFIX}/resumes`, {
      ...data
    })

    if (res.status === 201) {
      resume.value = res.data.result
      toast.add({
        title: 'Tạo sơ yếu lý lịch thành công',
        icon: 'i-heroicons-check-circle-solid',
        timeout: 2000
      })
    }
  }

  const getResumeById = async (id: number) => {
    const res = await axios.get(`${config.public.API_ROOT + config.public.API_PREFIX}/resumes/${id}`)
    if (res.status === 200) {
      resume.value = res.data.result
      // toast.add({
      //   title: 'Lấy thông tin sơ yếu lý lịch thành công',
      //   icon: 'i-heroicons-check-circle-solid',
      //   timeout: 2000
      // })
    }
  }

  const updateResume = async (id: number, data: Resume) => {
    const res = await axios.put(`${config.public.API_ROOT + config.public.API_PREFIX}/resumes/${id}`, {
      ...data
    })

    if (res.status === 200) {
      resume.value = res.data.result
      toast.add({
        title: 'Cập nhật sơ yếu lý lịch thành công',
        icon: 'i-heroicons-check-circle-solid',
        timeout: 2000
      })
    }
  }

  const setResume = async (data: Resume) => {
    resume.value = data
  }

  return { resume, setResume, getResumeById, updateResume, createResume }
})
