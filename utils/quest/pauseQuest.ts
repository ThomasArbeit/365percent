import type { QuestType } from "~/models/types/QuestType";

export async function pauseQuest (questId: QuestType['id'], userId: string, elapsed: number) {
  const { $supabase } = useNuxtApp();
  const { error } = await $supabase
    .from('quests')
    .update({
      status: 'pending',
      paused_at: new Date().toISOString(),
      duration_seconds: elapsed,
    })
    .eq('id', questId)
    .eq('user_id', userId)

  if (error) {
    console.error('Erreur lors du stop de la quête:', error.message)
    return { success: false, error: error.message }
  }

  return { success: true }
}