import { io } from 'socket.io-client'

export default defineNuxtPlugin((nuxtApp) => {
  const socket = io('http://localhost:8017', {
    transports: ['websocket'],
    autoConnect: true
  })
  nuxtApp.provide('socket', socket)
})
