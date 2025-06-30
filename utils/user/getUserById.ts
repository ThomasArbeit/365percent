export async function getUserById (id: string) {
  const {$supabase} = useNuxtApp();
  const {data, error} = await $supabase
  .from('users')
  .select('*')
  .eq('id', id)
  .single()
  if (error) {
    console.log('Erreur de deconnexion', error.message);
    throw error;
  }
  return { data, error };
}