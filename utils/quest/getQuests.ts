export async function getQuestsByUserId (userId: string): Promise<any> {
  const {$supabase} = useNuxtApp();
  const {data, error} = await $supabase
  .from('quests')
  .select('*')
  .eq('user_id', userId)
  .order('created_at', { ascending: true });
  if (error) {
    console.log('Erreur lors de la recuperation des quetes', error.message);
    throw error;
  }
  return {data, error};
}