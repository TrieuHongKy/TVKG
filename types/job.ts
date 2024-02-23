import type { User } from '~/types/user'

export interface Job {
[x: string]: any
[x: string]: any
  id: number
  job_detail: JobDetail
  company: Company
  category: Category
  province: Province
  district: District
  ward: Ward
  job_type: JobType
  job_status: JobStatus
  job_salary: JobSalary
  job_requirement: JobRequirement
  job_attribute: JobAttribute
  created_at: string
  updated_at: string
}

export interface JobDetail {
  id: number
  title: string
  slug: string
  description: string
  address: string
}

export interface Company {
  id: number
  user: User
  company_name: string
  slug: string
  company_logo: string
  banner: string
  company_description: string
  website: string
  address: any
  company_size: number
  company_type: string
  company_industry: string
  company_address: string
  tax_code: string
  created_at: string
  updated_at: string
}

export interface Category {
  id: number
  name: string
  slug: string
  description: any
  parent: any
  image: any
  status: number
}

export interface Province {
  id: number
  name: string
  slug: string
}

export interface District {
  id: number
  province_id: number
  name: string
  slug: string
}

export interface Ward {
  id: number
  district_id: number
  name: string
  slug: string
}

export interface JobType {
  id: number
  name: string
  slug: string
  is_active: number
}

export interface JobStatus {
  id: number
  name: string
  slug: string
  is_active: number
}

export interface JobSalary {
  id: number
  min_salary: number
  max_salary: number
  fixed_salary: number
}

export interface JobRequirement {
  id: number
  major: Major
  degree: Degree
  experience: Experience
}

export interface Major {
  id: number
  name: string
  short_name: string
  slug: string
  created_at: string
  updated_at: string
}

export interface Degree {
  name: string
}

export interface Experience {
  name: string
  slug: string
  is_active: number
}

export interface JobAttribute {
  id: number
  is_active: number
  is_featured: number
  is_published: number
  published_at: string
  expired_at: string
}
