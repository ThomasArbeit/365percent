// ~/service/auth/useAuthService.ts
import { ref, type Ref } from 'vue'
import type { User } from '@supabase/supabase-js'
import { getUserById } from '~/api/user/getUserById'
import { loginWithEmail } from '~/api/auth/login'

export default class useAuthService {
  private static instance: useAuthService | null = null

  public auth: Ref<User | null> = ref(null)
  public user: Ref<any | null> = ref(null)

  static getInstance(): useAuthService {
    if (!this.instance) {
      this.instance = new useAuthService()
    }
    return this.instance
  }

  // Méthode async à appeler pour init user et auth
  async init() {
    const { $supabase } = useNuxtApp()
    const { data: { user }, error } = await $supabase.auth.getUser()

    if (error || !user) {
      this.auth.value = null
      this.user.value = null
      return
    }

    this.auth.value = user

    // Récupérer les infos personnalisées en base
    const { data: userData, error: userError } = await getUserById(user.id)
    if (!userError) {
      this.user.value = userData
    }
  }

  async login(email: string, password: string) {
    const { data: userAuth } = await loginWithEmail(email, password)
    this.auth.value = userAuth.user;
    if ( userAuth.user?.id) {
      const {data: userData} = await getUserById(userAuth.user?.id)
      this.user.value = userData;
    }
  }

  private constructor() {
    // Ne pas lancer init ici pour pouvoir await ailleurs
  }
}
