<template>
  <div>
    <AuthSignUpBusiness></AuthSignUpBusiness>
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

    const authStore = useAuthStore()
    const { user_type } = storeToRefs(authStore)
    onMounted(() => {
      if (user_type.value === '') {
        return navigateTo('/auth/signup')
      }
    })
    return {}
  }
})
</script>

<style scoped></style>
