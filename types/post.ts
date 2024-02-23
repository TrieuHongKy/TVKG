import type { User } from '~/types/user'

interface Comment {
  id: number
}

export interface Post {
  [x: string]: any
  isLiked: boolean
  likes: number
  id: number
  title: string
  slug: string
  content: string
  image: string
  user: User
  comment: Comment
  published_at: string
  created_at: string
  updated_at: string
}
