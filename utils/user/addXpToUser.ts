export async function addXPToUser(userId: string, xpToAdd: number): Promise<void> {
  console.log(userId)
  const {$supabase} = useNuxtApp();
  const { data: user, error: fetchError } = await $supabase
    .from('users')
    .select('global_xp')
    .eq('id', userId)
    .single()

  if (fetchError) {
    console.error('Erreur lors de la récupération du user :', fetchError)
    throw fetchError
  }

  const newXP = (user?.global_xp ?? 0) + xpToAdd

  const { error: updateError } = await $supabase
    .from('users')
    .update({ global_xp: newXP })
    .eq('id', userId)

  if (updateError) {
    console.error('Erreur lors de l’update :', updateError)
    throw updateError
  }

  console.log(`Ajout de ${xpToAdd} XP réussi pour le user ${userId}`)
}
