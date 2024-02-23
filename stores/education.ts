import axios from 'axios'
import { defineStore } from 'pinia'
import { type Education } from '~/types/profile'

export const useEducationStore = defineStore('education', () => {
  const config = useRuntimeConfig()
  const educations = ref<Array<Education>>([])
  const education = ref<Education | null>(null)
  const toast = useToast()

  const createEducation = async (data: Education) => {
    const res = await axios.post(`${config.public.API_ROOT + config.public.API_PREFIX}/educations`, {
      ...data
    })
    if (res.status === 201) {
      educations.value.push(res.data.result)
      toast.add({
        title: 'Tạo chương trình giáo dục thành công',
        icon: 'i-heroicons-check-circle-solid',
        timeout: 2000
      })
    }
  }

  const getEducationByCandidate = async (data: Array<Education>) => {
    educations.value = []
    educations.value.push(...data)
  }

  const updateEducation = async (id: number, data: Education) => {
    const res = await axios.put(`${config.public.API_ROOT + config.public.API_PREFIX}/educations/${id}`, {
      ...data
    })

    if (res.status === 200) {
      const index = educations.value.findIndex((item) => item.id === id)
      educations.value[index] = res.data.result
      toast.add({
        title: 'Cập nhật chương trình giáo dục thành công',
        icon: 'i-heroicons-check-circle-solid',
        timeout: 2000
      })
    }
  }

  const getEducationById = async (id: number) => {
    const res = await axios.get(`${config.public.API_ROOT + config.public.API_PREFIX}/educations/${id}`)
    if (res.status === 200) {
      education.value = res.data.result
    }
  }

  const removeEducation = async (id: number) => {
    const res = await axios.delete(`${config.public.API_ROOT + config.public.API_PREFIX}/educations/${id}`)
    if (res.status === 200) {
      const index = educations.value.findIndex((item) => item.id === id)
      educations.value.splice(index, 1)
      toast.add({
        title: 'Xóa chương trình giáo dục thành công',
        icon: 'i-heroicons-check-circle-solid',
        timeout: 2000
      })
      return
    }
  }

  return {
    educations,
    education,
    createEducation,
    getEducationByCandidate,
    getEducationById,
    updateEducation,
    removeEducation
  }
})
