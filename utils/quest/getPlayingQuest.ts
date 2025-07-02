import type { QuestType } from "~/models/types/QuestType";

export async function getPlayingQuest ( userId: string): Promise<any> {
  const { $supabase } = useNuxtApp();
  const { data, error } = await $supabase
  .from('quests')
  .select('*')
  .eq('user_id', userId)
  .eq('status', 'playing')
  .limit(1)
  .single();
  if (error) {
    if (error.code !== 'PGRST116') { // ignore "Row not found"
      console.error('Erreur lors de la récupération de la quête en cours:', error.message);
    }
  }
  if (!data) console.log('Aucune quete en cours')
  else return { data }
}