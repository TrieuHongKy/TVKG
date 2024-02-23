export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore()
  if (authStore.isLogin) {
    return await navigateTo('/', { replace: true })
  }
})
