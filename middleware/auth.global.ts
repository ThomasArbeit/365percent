import useAuthService from '~/service/auth/useAuthService'

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (to.path === '/login') {
    return
  }

  const auth = useAuthService.getInstance()

  // Si l'init n'a pas été appelée, on la lance
  if (auth.isLoading.value === false && auth.auth.value === null) {
    await auth.init()
  }

  // Attendre la fin du chargement (au cas où)
  while (auth.isLoading.value) {
    await new Promise(resolve => setTimeout(resolve, 50)) // petite attente
  }

  if (!auth.auth.value) {
    return navigateTo('/login')
  }
})
