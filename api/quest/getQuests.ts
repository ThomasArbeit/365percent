import type { QuestModalSetupProps } from "~/components/app/quest/QuestModal.setup";

export async function getQuestsByUserId (userId: string): Promise<any> {
  const {$supabase} = useNuxtApp();
  const {data, error} = await $supabase
  .from('quests')
  .select('*')
  .eq('user_id', userId)
  if (error) {
    console.log('Erreur lors de la recuperation des quetes', error.message);
    throw error;
  }
  return {data, error};
}