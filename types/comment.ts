import type { User } from '~/types/user'

export interface Comment {
  [x: string]: any
  id: number
  user: User
  parent: Comment
  comment: string
}
