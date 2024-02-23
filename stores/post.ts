import axios from 'axios'
import { defineStore } from 'pinia'
import type { Post } from '~/types/post'
import type { Comment } from '~/types/comment'
import type { Category } from '~/types/category'

export const usePostStore = defineStore('post', () => {
  const config = useRuntimeConfig()
  const toast = useToast()

  const categories = ref<Array<Category>>([])
  const category = ref<Category | null>(null)
  const isLoadingCategory = ref<Boolean>(true)

  const post = ref<Post | null>(null)
  const allPost = ref<Array<Post>>([])
  const postsInCategory = ref<Array<Post>>([])
  const isLoadingPost = ref<Boolean>(true)

  const comments = ref<Array<Comment>>([])
  const commentsByParent = ref<Array<Comment>>([])
  const parentComment = ref<Comment | null>(null)
  const isLoadingComment = ref<Boolean>(true)

  const setCategory = async (data: Category) => {
    category.value = data
  }

  const getCategories = async () => {
    const res = await axios.get(`${config.public.API_ROOT + config.public.API_PREFIX}/categories`)
    if (res.status === 200) {
      categories.value = res.data.result.data
    }
  }

  const getCategory = async (slug: String) => {
    const res = await axios.get(`${config.public.API_ROOT + config.public.API_PREFIX}/categories/${slug}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    if (res.status === 200) {
      await setCategory(res.data.result)
    }
  }

  const setPost = async (data: Post) => {
    post.value = data
  }

  const getPost = async () => {
    isLoadingPost.value = true
    const res = await axios.get(`${config.public.API_ROOT + config.public.API_PREFIX}/posts`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    if (res.status === 200) {
      allPost.value = res.data.result.data
      isLoadingPost.value = false
    }
  }

  const getPostBySlug = async (slug: String) => {
    const { data } = await axios.get(`${config.public.API_ROOT + config.public.API_PREFIX}/posts/${slug}`)
    await setPost(data.result)
  }

  const getPostsByCategory = async (slug: String) => {
    isLoadingPost.value = true
    const res = await axios.get(`${config.public.API_ROOT + config.public.API_PREFIX}/category/${slug}/posts`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    if (res.status === 200) {
      postsInCategory.value = res.data.result.data
      isLoadingPost.value = false
    }
  }

  const getCommentByPost = async (post_id: any) => {
    isLoadingComment.value = true
    const res = await axios.get(`${config.public.API_ROOT + config.public.API_PREFIX}/posts/${post_id}/comments`)
    if (res.status === 200) {
      comments.value = res.data.result.data
      isLoadingComment.value = false
    }
  }

  const getCommentByParent = async (id: any) => {
    const res = await axios.get(`${config.public.API_ROOT + config.public.API_PREFIX}/post_comments/${id}`)
    if (res.status === 200) {
      commentsByParent.value = res.data.result.data
    }
  }

  const createComment = async (data: Comment) => {
    const res = await axios.post(`${config.public.API_ROOT + config.public.API_PREFIX}/post_comments`, {
      ...data
    })
    if (res.status === 201) {
      comments.value.push(res.data.result)
      toast.add({
        title: 'Bình luận thành công',
        icon: 'i-heroicons-check-circle-solid',
        timeout: 2000
      })
    }
  }

  const removeComment = async (id: number) => {
    const res = await axios.delete(`${config.public.API_ROOT + config.public.API_PREFIX}/post_comments/${id}`)
    if (res.status === 200) {
      const index = comments.value.findIndex((item) => item.id === id)
      comments.value.splice(index, 1)
      toast.add({
        title: 'Xóa bình luận thành công',
        icon: 'i-heroicons-check-circle-solid',
        timeout: 2000
      })
    }
  }

  const toggleLikeByPost = async (user_id: any, post_id: any) => {
    const res = await axios.post(`${config.public.API_ROOT + config.public.API_PREFIX}/post_likes`, {
      user_id,
      post_id
    })
    if (res.status === 201) {
      toast.add({
        title: 'Thích bài viết thành công',
        icon: 'i-heroicons-check-circle-solid',
        timeout: 2000
      })
    }
    if (res.status === 200) {
      toast.add({
        title: 'Bỏ thích bài viết thành công',
        icon: 'i-heroicons-check-circle-solid',
        timeout: 2000
      })
    }
  }

  const checkLikePost = async (user_id: any, post_id: any) => {
    const res = await axios.get(
      `${config.public.API_ROOT + config.public.API_PREFIX}/post_likes/like_check/${user_id}/${post_id}`
    )
    if (res.status === 200) {
      return true
    }

    return false
  }

  const updatePost = async (id: number, data: Post) => {
    const res = await axios.put(`${config.public.API_ROOT + config.public.API_PREFIX}/posts/${id}`, {
      ...data
    })

    if (res.status === 200) {
      const index = allPost.value.findIndex((item) => item.id === id)
      allPost.value[index] = res.data.result
    }
  }

  return {
    //category
    categories,
    category,
    isLoadingCategory,
    setCategory,
    getCategories,
    getCategory,
    //comment
    comments,
    parentComment,
    isLoadingComment,
    createComment,
    removeComment,
    getCommentByPost,
    getCommentByParent,
    //post
    post,
    allPost,
    postsInCategory,
    isLoadingPost,
    setPost,
    getPost,
    getPostBySlug,
    getPostsByCategory,
    updatePost,
    //like
    toggleLikeByPost,
    checkLikePost
  }
})
