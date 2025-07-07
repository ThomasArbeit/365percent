<script lang="ts" setup>
import Input from '~/components/ui/input/Input.vue';
import { QuestModalSetup, type QuestModalSetupEmit, type QuestModalSetupProps } from './QuestModal.setup';
import Button from '~/components/ui/button/Button.vue';
import TextArea from '~/components/ui/textarea/TextArea.vue';
  const emits = defineEmits<QuestModalSetupEmit>(); 
  const props = defineProps<QuestModalSetupProps>();
  const setup = new QuestModalSetup(props, emits);
</script>

<template>
  <div class="quest-modal gap gap--page" v-if="setup.quest">
    <Input type="text" size="xl" label="Quete" v-model="setup.quest.title" placeholder="Ex : Nouvelle super quête "/>
    <TextArea type="text" label="Description" v-model="setup.quest.description" placeholder="Ex : Cette quete est fait pour apprendre une nouvelle chose, maintenir une habitude"/>
    <Input type="text" label="Etapes de quête" v-model="setup.quest.domain" placeholder="Ajoutez une étape"/>
    <Input type="text" label="Categorie(s)" v-model="setup.quest.domain" placeholder="Ajoutez une catégorie"/>
    <!-- <Input type="date" label="A réaliser pour" v-model="setup.quest.tag" placeholder="Ajoutez une date"/> -->
    <div class="quest-modal__actions">
      <div class="quest-modal__chrono" v-if="setup.quest.isRunning.value" :style="{ transform: `scale(4) rotate(${setup.quest.timeInterval.value * -6}deg)` }">
        <div :class="['quest-modal__bar', `${(i === 60 || i % 5 === 0) ? 'quest-modal__bar--big' : null}`]" v-for="i in 60" :key="i" :style="{ transform: `rotate(${i * 6}deg) translateY(-90px)` }"/>
      </div>
      <p class="quest-modal__timer" v-if="setup.isSameQuestAsRunning">{{ setup.quest.formattedTime }}</p>
      <Button v-if="setup.quest.isNew" label="Creer la quête" @click="setup.addQuest()"/>
      <div class="quest-modal__buttons" v-else>
        <Button v-if="!setup.quest.isRunning.value" fill-icon icon-left="Play" label="Lancer la quête" @click.stop="setup.isSameQuestAsRunning ? setup.quest.toggle() : setup.quest.startQuest()"/>
        <Button v-if="setup.quest.isRunning.value" icon-left="CircleCheckBig" label="J'ai fini !" @click.stop="setup.quest.toggle()" variant="secondary"/>
        <Button v-if="setup.quest.isRunning.value" fill-icon icon-left="Pause" label="Pause" @click.stop="setup.quest.toggle()" variant="secondary"/>
      </div>
    </div>
  </div>
</template>