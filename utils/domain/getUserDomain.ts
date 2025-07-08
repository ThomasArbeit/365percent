
export async function getUserDomains ( userId: string ): Promise<any> {
  const { $supabase } = useNuxtApp();
  const { data, error } = await $supabase
  .from('user_domains')
  .select('*')
  .eq('user_id', userId)
  console.log(data)
  if (error) console.log('Une erreur est survenue lors de la recherche des user_domains', error)
  if (!data) console.log('Aucune quete en cours')
  else return { data }
}