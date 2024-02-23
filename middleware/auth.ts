export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore()
  const { isLogin } = storeToRefs(authStore)
  if (!isLogin) {
    return navigateTo('/auth/signin', { replace: true })
  } else {
    return navigateTo('/', { replace: true })
  }
})
