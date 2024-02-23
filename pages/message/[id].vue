<template>
  <div class="mt-8">
    <div class="container mx-auto">
      <div class="h-[calc(90vh_-_var(--h-header))]">
        <div class="flex gap-4 h-full">
          <!-- Left -->
          <div class="message__section w-1/6 md:w-1/3 flex flex-col">
            <!-- Header -->
            <div class="py-2 px-3 flex flex-row justify-start gap-2 items-center">
              <UAvatar :src="user?.image as any" :alt="user?.name as any" size="lg" />

              <span>{{ user?.name }}</span>
            </div>

            <!-- Search -->
            <div class="py-2 px-2">
              <UInput placeholder="Search or start new chat" />
            </div>

            <!-- Contacts -->

            <div class="w-full flex-1 flex-col items-center md:items-start gap-2 mt-2 overflow-auto no-scrollbar">
              <template v-if="isLoading">
                <LazyMessageChatListLoading />
              </template>
              <template v-else>
                <LazyMessageChatList :chats="users" @selected-user="onSelectedUser" />
              </template>
            </div>
          </div>

          <!-- Right -->
          <div class="message__section w-5/6 md:w-2/3">
            <div v-if="selectedUser" class="w-full h-full flex flex-col">
              <!-- Header -->
              <div
                class="py-2 px-3 flex flex-row justify-between items-center shadow-md bg-theme-light dark:bg-theme-dark rounded-md z-40"
              >
                <div class="flex items-center">
                  <div>
                    <UAvatar
                      :chip-color="selectedUser?.connected ? 'primary' : 'gray'"
                      chip-text=""
                      chip-position="bottom-right"
                      :src="selectedUser?.image"
                      :alt="selectedUser?.name"
                      size="lg"
                    />
                  </div>
                  <div class="ml-4">
                    <p class="text-grey-darkest">{{ selectedUser?.name ?? 'Trieu Hong Ky' }}</p>
                    <p class="text-grey-darker text-xs mt-1">
                      <span v-if="selectedUser?.connected" class="text-primary"><i> Đang trực tuyến </i></span>
                      <span v-else>
                        <i>
                          Hoạt động lần cuối
                          {{ new Date(selectedUser?.lastOnline).toLocaleTimeString() }}
                        </i>
                      </span>
                    </p>
                  </div>
                </div>

                <div class="flex">
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                      <path
                        fill="#263238"
                        fill-opacity=".5"
                        d="M15.9 14.3H15l-.3-.3c1-1.1 1.6-2.7 1.6-4.3 0-3.7-3-6.7-6.7-6.7S3 6 3 9.7s3 6.7 6.7 6.7c1.6 0 3.2-.6 4.3-1.6l.3.3v.8l5.1 5.1 1.5-1.5-5-5.2zm-6.2 0c-2.6 0-4.6-2.1-4.6-4.6s2.1-4.6 4.6-4.6 4.6 2.1 4.6 4.6-2 4.6-4.6 4.6z"
                      ></path>
                    </svg>
                  </div>
                  <div class="ml-6">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                      <path
                        fill="#263238"
                        fill-opacity=".5"
                        d="M1.816 15.556v.002c0 1.502.584 2.912 1.646 3.972s2.472 1.647 3.974 1.647a5.58 5.58 0 0 0 3.972-1.645l9.547-9.548c.769-.768 1.147-1.767 1.058-2.817-.079-.968-.548-1.927-1.319-2.698-1.594-1.592-4.068-1.711-5.517-.262l-7.916 7.915c-.881.881-.792 2.25.214 3.261.959.958 2.423 1.053 3.263.215l5.511-5.512c.28-.28.267-.722.053-.936l-.244-.244c-.191-.191-.567-.349-.957.04l-5.506 5.506c-.18.18-.635.127-.976-.214-.098-.097-.576-.613-.213-.973l7.915-7.917c.818-.817 2.267-.699 3.23.262.5.501.802 1.1.849 1.685.051.573-.156 1.111-.589 1.543l-9.547 9.549a3.97 3.97 0 0 1-2.829 1.171 3.975 3.975 0 0 1-2.83-1.173 3.973 3.973 0 0 1-1.172-2.828c0-1.071.415-2.076 1.172-2.83l7.209-7.211c.157-.157.264-.579.028-.814L11.5 4.36a.572.572 0 0 0-.834.018l-7.205 7.207a5.577 5.577 0 0 0-1.645 3.971z"
                      ></path>
                    </svg>
                  </div>
                  <div class="ml-6">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                      <path
                        fill="#263238"
                        fill-opacity=".6"
                        d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>

              <!-- Messages -->
              <MessageList :selected-user="selectedUser"></MessageList>

              <!-- Input -->
              <message-form @on-send-message="onSendMessage"></message-form>
            </div>
            <div v-else class="w-full h-full flex flex-col items-center justify-center">
              <UIcon name="i-heroicons-chat-bubble-bottom-center-text" class="text-5xl" />
              Bạn chưa chọn đoạn chat nào
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type {Socket} from 'socket.io-client'

export default defineComponent({
  name: 'MessageComponent',
  async setup() {
    definePageMeta({
      layout: 'custom',
      title: 'Tin nhắn',
      description: 'Tin nhắn'
      // middleware: 'auth'
    })
    const nuxtApp = useNuxtApp()
    let socket = <Socket>nuxtApp.$socket

    const { user } = storeToRefs(useAuthStore())

    const messageStore = useMessageStore()
    const { chats, users, selectedUser, isLoading } = storeToRefs(messageStore)
    const { createMessage } = messageStore

    const id = computed(() => {
      return useRoute().params.id
    })

    onMounted(async () => {
      console.log('===USER===', user.value)

      if ((user.value as any)?.id !== id.value) {
        navigateTo('/message/' + (user.value as any)?.id, { replace: true })
      }
      socket.emit('myChats', id.value)

      socket.on('recieveMessage', ({ message, from, to }: any) => {
        if (Number(to) === Number(id.value)) {
          users.value.forEach((u: any) => {
            if (Number(from) === u?.user?.id) {
              if (!u.messages) u.messages = []
              u.messages.push({
                message,
                sender_id: from,
                createdAt: new Date().getTime()
              })
            }
          })
        }
      })
    })

    onUnmounted(() => {
      socket.off('getUsers')
      socket.off('userConnected')
      socket.off('recieveMessage')
      socket.off('userDisconnected')
    })

    function onSelectedUser(user: any) {
      selectedUser.value = user
    }

    async function onSendMessage(_msg: any) {
      socket.emit('sendMessage', {
        message: _msg,
        from: id.value,
        to: selectedUser.value?.user?.id
      })
      await createMessage({
        message: _msg,
        sender_id: id.value,
        chat_id: selectedUser.value?._id
      })
      if (!selectedUser.value.messages) selectedUser.value.messages = []
      selectedUser.value.messages.push({
        message: _msg,
        sender_id: id.value,
        createdAt: new Date().getTime()
      })
    }

    return {
      users,
      chats,
      isLoading,
      selectedUser,
      onSelectedUser,
      onSendMessage,
      user
    }
  }
})
</script>

<style scoped></style>
