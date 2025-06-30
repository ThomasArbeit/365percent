// middleware/auth.global.ts
import useAuthService from '~/service/auth/useAuthService'

export default defineNuxtRouteMiddleware(async () => {
  const auth = useAuthService.getInstance()
  if (!auth.auth.value) {
    return navigateTo('/login')
  }
})
