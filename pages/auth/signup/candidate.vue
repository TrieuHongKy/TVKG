<template>
  <div>
    <AuthSignUp></AuthSignUp>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    definePageMeta({
      layout: 'auth',
      title: 'Đăng ký',
      description: 'Đăng ký tài khoản',
      url: 'https://example.com/auth/sign-up',
      middleware: 'guest'
    })
    return {}
  }
})
</script>

<style scoped></style>
