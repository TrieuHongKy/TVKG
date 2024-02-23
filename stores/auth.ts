import {useCompanyStore} from './company'
import axios from 'axios'
import {defineStore} from 'pinia'
import type {Socket} from 'socket.io-client'

export const useAuthStore = defineStore('auth', () => {
  const nuxtApp = useNuxtApp()
  let socket = <Socket>nuxtApp.$socket
  const { status, data, signIn, signOut } = useAuth()
  const companyStore = useCompanyStore()
  const config = useRuntimeConfig()
  const toast = useToast()

  const isLogin = ref<Boolean>(false)
  const redirect = ref<String | null>(null)

  const user_type = ref('')

  const token = ref<String>('')
  type USER = {
    id?: number | null
    name?: string | null
    email?: string | null
    image?: string | null
    picture?: string | null
  }
  const user = ref<USER | null>(null)

  const getUser = async () => {
    const tokenVal = localStorage.getItem('token')
    const res = await axios.get('http://127.0.0.1:8000/api/v1/profile', {
      headers: {
        Authorization: `Bearer ${tokenVal}`
      }
    })
    if (res.status === 200) {
      user.value = { ...res.data }
      isLogin.value = true
      // socket.auth = { ...res.data }
      // socket.connect()
    }
  }

  // if (status.value === 'authenticated') {
  //   socket.auth = { ...data.value }
  //   socket.connect()
  // }

  const getUserById = async (id: any) => {
    const token = localStorage.getItem('token')
    const res = await axios.get(`${config.public.API_ROOT + config.public.API_PREFIX}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (res.status === 200) {
      return res.data.result
    }
  }

  watchEffect(async () => {
    if (status.value === 'authenticated') {
      isLogin.value = true
      if (socket.connected) {
        socket.disconnect()
      }
      socket.auth = { ...data.value?.user }
      socket.connect()
      user.value = data.value?.user as any
      if ((data.value?.user as any)?.user_type === 'company') {
        await companyStore.getCompanyByUserId((data.value?.user as any)?.id)
      }
    }
  })

  const login = async (data: {}) => {
    try {
      await signIn('credentials', {
        ...data,
        redirect: false,
        callbackUrl: '/'
      })
      toast.add({
        title: 'Đăng nhập thành công',
        icon: 'i-heroicons-check-circle-solid',
        timeout: 2000
      })
      await navigateTo('/', { replace: true })
    } catch {
      toast.add({
        title: 'Đăng nhập thất bại',
        icon: 'i-heroicons-check-circle-solid',
        color: 'red',
        timeout: 2000
      })
    }
  }

  const signInWithGoogle = async () => {
    const callback = redirect.value
    await signIn('google', { redirect: false, callbackUrl: (callback as any) || '/' })
    return navigateTo((callback as any) || '/', { replace: true })
  }

  const signUp = async (data: {}) => {
    const res = await axios.post('http://127.0.0.1:8000/api/v1/register', data)
    if (res.status === 201) {
      // toast.add({
      //   title: 'Đăng ký tài khoản thành công',
      //   icon: 'i-heroicons-check-circle-solid',
      //   timeout: 2000
      // })
      return navigateTo('/auth/signin', { replace: true })
    }
  }

  const logout = async () => {
    const tokenn = localStorage.getItem('token')
    await axios.get('http://127.0.0.1:8000/api/v1/logout', {
      headers: {
        Authorization: `Bearer ${tokenn}`
      }
    })
    token.value = ''
    user.value = null
    localStorage.removeItem('token')
    redirect.value = null // clear redirect
    await signOut({ redirect: false, callbackUrl: '' })
    toast.add({
      title: 'Đăng xuất thành công',
      icon: 'i-heroicons-check-circle-solid',
      timeout: 2000
    })
    isLogin.value = false
    return navigateTo('/auth/signin', { replace: true })
  }

  const setToken = async (data: String) => {
    token.value = data
  }

  return {
    isLogin,
    redirect,
    token,
    user,
    user_type,
    data,
    login,
    getUserById,
    signInWithGoogle,
    signUp,
    getUser,
    setToken,
    logout
  }
})
