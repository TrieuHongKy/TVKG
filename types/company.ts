import { Job } from '~/types/job'

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
  jobs?: Array<Job>
}
