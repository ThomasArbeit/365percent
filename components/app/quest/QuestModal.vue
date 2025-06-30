<script lang="ts" setup>
import Input from '~/components/ui/input/Input.vue';
import { QuestModalSetup, type QuestModalSetupProps } from './QuestModal.setup';
import Button from '~/components/ui/button/Button.vue';
import TextArea from '~/components/ui/textarea/TextArea.vue';
  const props = defineProps<QuestModalSetupProps>();
  const setup = new QuestModalSetup(props);
</script>

<template>
  <div class="quest-modal gap gap--page" v-if="setup.quest">
    <Input type="text" label="Quete" v-model="setup.quest.title" placeholder="Ex : Nouvelle super quête "/>
    <TextArea type="text" label="Description" v-model="setup.quest.description" placeholder="Ex : Cette quete est fait pour apprendre une nouvelle chose, maintenir une habitude"/>
    <Input type="text" label="Etapes de quête" v-model="setup.quest.domain" placeholder="Ajoutez une étape"/>
    <Input type="text" label="Categorie(s)" v-model="setup.quest.domain" placeholder="Ajoutez une catégorie"/>
    <!-- <Input type="date" label="A réaliser pour" v-model="setup.quest.tag" placeholder="Ajoutez une date"/> -->
    <div class="quest-modal__actions">
      <Button v-if="setup.quest.isNew" label="Sauvegarder" @click="setup.quest.addQuestAsync()"/>
      <Button v-else label="Commencer"/>
    </div>
  </div>
</template>