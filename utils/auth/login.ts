export async function loginWithEmail (email: string, password: string) {
  const {$supabase} = useNuxtApp();
  const {data, error} = await $supabase.auth.signInWithPassword({
    email,
    password,
  })

  return { data, error };
}