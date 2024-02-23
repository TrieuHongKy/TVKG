import axios from 'axios'
import { defineStore } from 'pinia'
import type { Skill } from '~/types/skill'

export const useSkillStore = defineStore('skill', () => {
  const config = useRuntimeConfig()
  const skills = ref<Array<Skill>>([])

  const setSkills = (newSkills: Array<Skill>) => {
    skills.value = newSkills
  }

  const getSkills = async () => {
    const res = await axios.get(`${config.public.API_ROOT + config.public.API_PREFIX}/skills`)
    if (res.status === 200) {
      setSkills(res.data.result.data)
    }
  }

  return {
    skills,
    getSkills,
    setSkills
  }
})
