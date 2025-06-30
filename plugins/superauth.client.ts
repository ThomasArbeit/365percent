// ~/plugins/auth.client.ts (client only) ou auth.plugin.ts (SSR)
// mais pour l'instant, on recommande client only car supabase auth côté client

import useAuthService from '~/service/auth/useAuthService'

export default defineNuxtPlugin(async () => {
  const auth = useAuthService.getInstance()
  await auth.init()

  // Optionnel : injecter dans le context
  return {
    provide: {
      auth,
    }
  }
})
