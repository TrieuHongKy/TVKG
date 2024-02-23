<template>
  <div></div>
</template>

<script setup lang="ts">
definePageMeta({
  title: 'Đăng xuất',
  layout: 'custom'
})
onMounted(() => {
  const { signOut } = useAuth()
  signOut({ callbackUrl: '/auth/signin' })
})
</script>

<style scoped></style>
