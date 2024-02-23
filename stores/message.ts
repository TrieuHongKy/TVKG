import axios from 'axios'
import { defineStore } from 'pinia'
import type { Socket } from 'socket.io-client'

export const useMessageStore = defineStore('message', () => {
  const nuxtApp = useNuxtApp()
  const config = useRuntimeConfig()

  const messages = ref<Array<object>>([])
  const chats = ref<Array<any>>([])
  const users = ref()
  const isLoading = ref(true)
  const selectedUser = ref()

  let socket = <Socket>nuxtApp.$socket

  const createNewChat = async (data: any) => {
    try {
      const res = await axios.post(`${config.public.API_CHAT || 'http://localhost:8017'}/v1/chats`, data)
      chats.value.push(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  const createMessage = async (data: any) => {
    const res = await axios.post(`${config.public.API_CHAT || 'http://localhost:8017'}/v1/messages`, data)
    if (res.status === 201) {
      console.log('===MESSAGE===', res.data)
    }
  }

  socket.on('getUsers', (usersList: any) => {
    users.value = JSON.parse(usersList)
    if (users.value) {
      isLoading.value = false
    }
  })

  socket.on('userConnected', (user: any) => {
    const index = users.value?.findIndex((u: any) => u?.user?.id === user?.user_id)

    if (index !== -1) {
      users.value[index] = {
        ...users.value[index],
        id: user.id,
        connected: true
      }
      if (selectedUser.value?.user?.id === users.value[index]?.user?.id) {
        selectedUser.value = users.value[index]
      }
    }
  })

  socket.on('userDisconnected', (user: any) => {
    const existingUser = users.value?.find((u: any) => u?.user.id === user.user_id)
    if (existingUser) {
      existingUser.connected = false
    }
  })

  return {
    messages,
    // addMessage,
    isLoading,
    selectedUser,
    createNewChat,
    createMessage,
    chats,
    users
  }
})
