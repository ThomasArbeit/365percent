export async function getFinishedQuestsTodayByUserId(userId: string): Promise<any> {
  const { $supabase } = useNuxtApp();

  const now = new Date();
  const startOfDay = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  const endOfDay = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 23, 59, 59, 999));

  const { data, error } = await $supabase
    .from('quests')
    .select('*')
    .eq('user_id', userId)
    .gte('completed_at', startOfDay.toISOString())
    .lte('completed_at', endOfDay.toISOString())
    .order('created_at', { ascending: true });

  if (error) {
    console.log('Erreur lors de la récupération des quêtes', error.message);
    throw error;
  }

  return { data };
}
