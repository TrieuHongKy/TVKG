import { type User } from '~/types/user'

export interface Contact {
  id: number
  user: User
  name: string
  phone: string
  email: string
  address: string
  content: string
}
