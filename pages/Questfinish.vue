<script lang="ts" setup>
import QuestFinishSetup, { type QuestFinishSetupEmits, type QuestFinishSetupProps } from './Questfinish.setup';
import Button from '~/components/ui/button/Button.vue';
const props = defineProps<QuestFinishSetupProps>();
const emits = defineEmits<QuestFinishSetupEmits>();
const setup = new QuestFinishSetup(props, emits);

</script>

<template>
  <div class="quest-finish gap gap--page">
    <div class="quest-finish__header">
      <NuxtImg src="flame.png" width="80"/>
      <p class="quest-finish__header-title">Quête terminée ! </p>
      <p class="quest-finish__header-xp">+{{ setup.finishedQuest?.xpReward }} xp</p>
    </div>

    <div class="quest-finish__actions">
      <Button variant="secondary" label="Retour a l'accueil" @click.stop="setup.router.push('/')"/>
    </div>

  </div>
</template>