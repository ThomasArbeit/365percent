import type { QuestType } from "~/models/types/QuestType";

export async function addQuest (quest: QuestType, userId: string) {
  const {$supabase} = useNuxtApp();
  const { data, error } = await $supabase
  .from('quests')
  .insert({
    ...quest,
    scheduled_at: new Date().toISOString(),
    user_id: userId,
  })
  .select('*')
  if (error) {
    console.error('Erreur:', error)
  } else {
    console.log('Quête ajoutée:', data)
  }

  return {data, error};
}