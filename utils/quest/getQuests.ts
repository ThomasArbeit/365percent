export async function getQuestsByUserId(userId: string): Promise<any> {
  const { $supabase } = useNuxtApp();
  const today = new Date().toISOString().split('T')[0];

  const { data: nonFinished, error: error1 } = await $supabase
    .from('quests')
    .select('*')
    .eq('user_id', userId)
    .neq('status', 'finished');

  const { data: todayScheduled, error: error2 } = await $supabase
    .from('quests')
    .select('*')
    .eq('user_id', userId)
    .gte('scheduled_at', `${today}T00:00:00.000Z`)
    .lt('scheduled_at', `${today}T23:59:59.999Z`);

  if (error1 || error2) {
    console.error('Erreur lors de la récupération des quêtes', error1?.message || error2?.message);
    throw error1 || error2;
  }

  // Fusionner sans doublons
  const all = [...(nonFinished || []), ...(todayScheduled || [])];
  const seen = new Set();
  const unique = all.filter((quest) => {
    if (seen.has(quest.id)) return false;
    seen.add(quest.id);
    return true;
  });

  return { data: unique };
}