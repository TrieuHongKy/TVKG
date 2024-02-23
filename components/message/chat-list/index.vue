<template>
  <div>
    <div
      v-for="(chat, index) in chats"
      :key="index"
      class="px-0 md:px-3 my-2 md:my-0 flex items-center justify-center md:justify-start hover:bg-grey-light cursor-pointer"
      @click="onSelectedUser(chat)"
    >
      <UAvatar
        :chip-color="chat?.connected ? 'primary' : 'gray'"
        chip-text=""
        chip-position="bottom-right"
        :src="chat?.user?.image"
        :alt="chat?.user?.name"
        size="lg"
      />
      <div class="hidden md:block ml-4 flex-auto md:flex-1 border-b border-grey-lighter py-2">
        <div class="flex items-bottom justify-between">
          <p class="text-grey-darkest">{{ chat?.name }}</p>
        </div>
        <p class="flex gap-2 justify-between text-grey-dark mt-1 text-sm">
          <span v-if="chat?.messages?.length > 0" class="basis-full line-clamp-1">
            <span v-if="chat?.messages?.self">Bạn: </span>
            {{ chat?.messages[chat?.messages.length - 1]?.message }}
          </span>
          <span v-else class="basis-full line-clamp-1 italic"> Nhấn để chat ngay </span>

          <span class="whitespace-nowrap text-xs text-grey-darkest">
            {{
              chat?.messages?.length > 0
                ? new Date(chat?.messages[chat?.messages.length - 1]?.createdAt).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })
                : ''
            }}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  props: ['chats'],
  emits: ['selectedUser'],
  setup(props, { emit }) {
    const onSelectedUser = (user: any) => {
      emit('selectedUser', user)
    }

    const chatList = ref()

    onMounted(() => {
      console.log('ccc: ', props.chats)
    })

    return {
      onSelectedUser,
      chatList
    }
  }
})
</script>

<style scoped></style>
