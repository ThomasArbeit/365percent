// ~/service/auth/useAuthService.ts
import { ref, type Ref } from 'vue'
import type { User } from '@supabase/supabase-js'
import { getUserById } from '~/utils/user/getUserById'
import { loginWithEmail } from '~/utils/auth/login'

export default class useAuthService {
  private static instance: useAuthService | null = null

  public auth: Ref<User | null> = ref(null)
  public user: Ref<any | null> = ref(null)
  public isLoading: Ref<boolean> = ref(false)  // nouvel état de chargement

  get userId () {
    return this.user.value.id;
  }

  get userData () {
    return this.user.value;
  }

  static getInstance(): useAuthService {
    if (!this.instance) {
      this.instance = new useAuthService()
    }
    return this.instance
  }

  async init() {
    this.isLoading.value = true
    const { $supabase } = useNuxtApp()
    const { data: { user }, error } = await $supabase.auth.getUser()

    if (error || !user) {
      this.auth.value = null
      this.user.value = null
      this.isLoading.value = false
      return
    }

    this.auth.value = user

    const { data: userData, error: userError } = await getUserById(user.id)
    if (!userError) {
      this.user.value = userData
    }
    this.isLoading.value = false
  }

  async login(email: string, password: string) {
    const { data: userAuth } = await loginWithEmail(email, password)
    this.auth.value = userAuth.user
    if (userAuth.user?.id) {
      const { data: userData } = await getUserById(userAuth.user.id)
      this.user.value = userData
    }
  }

  private constructor() {}
}
