<template>
  <div class="flex-1 max-w-full overflow-auto no-scrollbar text-tertiary dark:text-tertiary">
    <div class="py-2 px-3">
      <div class="flex justify-center mb-2">
        <div class="rounded py-2 px-4" style="background-color: #ddecf2">
          <p class="text-sm uppercase">24/10/2023</p>
        </div>
      </div>

      <div class="flex justify-center mb-4">
        <div class="rounded py-2 px-4" style="background-color: #fcf4cb">
          <p class="text-xs">
            Tin nhắn đến cuộc trò chuyện này hiện được bảo mật bằng mã hóa hai chiều. Nhấn để biết thêm thông tin.
          </p>
        </div>
      </div>

      <div v-for="(msg, index) in selectedUser.messages" :key="index" class="">
        <div v-if="Number(msg.sender_id) === Number(selectedUser?.user?.id)" class="flex mb-2">
          <div class="rounded py-2 px-3 message__card">
            <p class="text-base mt-1">{{ msg.message }}</p>
            <p class="text-right text-xs text-grey-dark mt-1">
              {{ new Date(msg.createdAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) }}
            </p>
          </div>
        </div>
        <div v-else class="flex w-full justify-end mb-2">
          <div class="rounded py-2 px-3 message__card message__card--primary">
            <p class="text-base mt-1 break-normal">{{ msg.message }}</p>
            <p class="text-right text-xs text-grey-dark mt-1">
              {{ new Date(msg.createdAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: ['selectedUser'],
  setup() {
    return {}
  }
})
</script>

<style scoped></style>
