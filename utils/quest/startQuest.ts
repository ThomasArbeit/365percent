import type { QuestType } from "~/models/types/QuestType";

export async function startQuest (questId: QuestType['id'], userId: string) {
  const { $supabase } = useNuxtApp();
  const { error } = await $supabase
    .from('quests')
    .update({
      status: 'playing',
      started_at: new Date().toISOString(),
    })
    .eq('id', questId)
    .eq('user_id', userId)

  if (error) {
    console.error('Erreur lors du démarrage de la quête:', error.message)
    return { success: false, error: error.message }
  }

  return { success: true }
}