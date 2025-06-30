export async function signOut () {
  const {$supabase} = useNuxtApp();
  const {error} = await $supabase.auth.signOut();
  if (error) {
    console.log('Erreur de deconnexion', error.message);
    throw error;
  }
  return { error };
}