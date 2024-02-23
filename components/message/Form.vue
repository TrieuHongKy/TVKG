<template>
  <form
    class="px-4 py-4 flex gap-2 items-center bg-theme-light dark:bg-theme-dark rounded-md shadow-md"
    @submit.prevent="sendMessage"
  >
    <div class="flex items-center justify-center">
      <UIcon name="i-heroicons-paper-clip" class="cursor-pointer hover:text-primary dark:hover:text-primary text-2xl" />
    </div>
    <div class="flex items-center justify-center">
      <emoji-picker :theme="theme" @on-select="select">
        <template #button>
          <span class="cursor-pointer">😁</span>
        </template>
      </emoji-picker>
    </div>
    <div class="flex-1">
      <UInput v-model="msg" size="xl" class="px-2 py-2" />
    </div>
    <div>
      <UButton
        icon="i-heroicons-paper-airplane"
        size="lg"
        color="primary"
        square
        type="submit"
        variant="solid"
        class="px-4"
      />
    </div>
  </form>
</template>

<script lang="ts">
type Theme = 'light' | 'dark'
export default defineComponent({
  emits: ['onSendMessage'],
  setup(props, { emit }) {
    const theme = <Theme>useColorMode().preference

    const msg = ref('')
    const sendMessage = () => {
      if (msg.value !== '') {
        emit('onSendMessage', msg.value)
        msg.value = ''
      }
    }

    defineShortcuts({
      enter: {
        usingInput: true,
        whenever: [],
        handler: sendMessage
      }
    })

    function select(emoji: any) {
      msg.value += emoji
    }
    return {
      msg,
      theme,
      sendMessage,
      select
    }
  }
})
</script>

<style scoped></style>
