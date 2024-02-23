import type { User } from '~/types/user'
import type { Skill } from '~/types/skill'

export interface Profile {
  id: number
  user: User
  major: Major
  resume: Resume
  major_name: string
  skills: Skill[]
  educations: Education[]
  languages: Language[]
  address: Address
  created_at: string
  updated_at: string
}

export interface Major {
  id: number
  name: string
  short_name: string
  slug: string
  created_at: string
  updated_at: string
}

export interface Resume {
  id: number
  name: string
  description: string
  created_at: string
  updated_at: string
}

export interface Education {
  id: number
  education_name: string
  description: string
  start_date: string
  end_date: string
  major: string
  institution: string
  city: string
  country: string
  created_at: string
  updated_at: string
}

export interface Language {
  name: string
  slug: string
}

export interface Address {
  province: Province
  district: District
  ward: Ward
  created_at: string
  updated_at: string
}

export interface Province {
  id: number
  name: string
  slug: string
  created_at: string
  updated_at: string
}

export interface District {
  id: number
  province_id: number
  name: string
  slug: string
  created_at: string
  updated_at: string
}

export interface Ward {
  id: number
  district_id: number
  name: string
  slug: string
  created_at: string
  updated_at: string
}
