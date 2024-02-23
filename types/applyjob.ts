export interface ApplyJob {
  job_id: number
  user_id: number
  status: STATUS
}

export type STATUS = 'pending' | 'success' | 'failed'
