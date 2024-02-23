<template>
  <div class="h-min sticky top-20 flex flex-col items-center gap-2 company__section">
    <img :src="avatar" class="w-auto object-cover" alt="Ảnh minh họa" />
    <p class="text-center text-sm font-semibold px-2">{{ name }}</p>
    <UButton
      :label="statusFollow ? 'Đã theo dõi' : 'Theo dõi'"
      class="w-full sm:w-3/5 flex justify-center items-center"
      variant="solid"
      color="primary"
      :ui="{ rounded: 'rounded-full' }"
      :icon="statusFollow ? 'i-heroicons-check' : 'i-heroicons-bell'"
      @click="toggleFollow()"
    >
    </UButton>
    <UButton
      class="w-full sm:w-3/5 flex justify-center items-center"
      variant="outline"
      color="primary"
      :ui="{ rounded: 'rounded-full' }"
      icon="i-heroicons-chat-bubble-oval-left-ellipsis"
      label="Nhắn tin"
    >
    </UButton>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    avatar: {
      type: String,
      default: null
    },
    name: {
      type: String,
      default: null
    }
  },
  setup() {
    const toastCardCompany = useToast()

    const statusFollow = ref(false)

    const toggleFollow = () => {
      statusFollow.value = !statusFollow.value
      toastCardCompany.add({
        title: statusFollow.value ? 'Theo dõi thành công' : 'Bỏ theo dõi thành công',
        icon: statusFollow.value ? 'i-heroicons-check-circle-solid' : 'i-heroicons-x-circle-solid',
        timeout: 2000
      })
    }
    return { toastCardCompany, statusFollow, toggleFollow }
  }
})
</script>

<style scoped></style>
