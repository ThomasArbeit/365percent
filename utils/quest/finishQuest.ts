import type { QuestType } from "~/models/types/QuestType";

export async function finishQuest (questId: QuestType['id'], userId: string, elapsed: number) {
  const { $supabase } = useNuxtApp();
  const { error } = await $supabase
    .from('quests')
    .update({
      status: 'finished',
      paused_at: new Date().toISOString(),
      completed_at: new Date().toISOString(),
      xp_reward: elapsed,
    })
    .eq('id', questId)
    .eq('user_id', userId)

  if (error) {
    console.error('Erreur lors de la fin de la quête:', error.message)
    return { success: false, error: error.message }
  }

  return { success: true }
}