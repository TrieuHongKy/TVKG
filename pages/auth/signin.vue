<template>
  <div>
    <AuthSignIn></AuthSignIn>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    definePageMeta({
      layout: 'auth',
      title: 'Đăng nhập',
      description: 'Đăng nhập tài khoản',
      url: 'https://example.com/auth/sign-in',
      middleware: 'guest'
    })
    return {}
  }
})
</script>

<style scoped></style>
