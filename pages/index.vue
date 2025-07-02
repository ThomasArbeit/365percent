<script lang="ts" setup>
import Card from '~/components/ui/card/Card.vue';
import Modal from '~/components/ui/modal/Modal.vue';
import Section from '~/components/ui/section/Section.vue';
import FooterPlayer from '~/components/ui/footer-player/FooterPlayer.vue';
import UserTag from '~/components/app/user/UserTag.vue';
import QuestModal from '~/components/app/quest/QuestModal.vue';
import Button from '~/components/ui/button/Button.vue';
import IndexSetup from './index.setup';
import QuestSticker from '~/components/app/quest/QuestSticker.vue';
import DashboardCard from '~/components/app/dashboard/DashboardCard.vue';
const setup = new IndexSetup();
</script>

<template>
  <div class="gap gap--page" v-if="setup.self.user.value">
    <UserTag v-bind="setup.self.user.value"/>
    <Section title="Aujourd'hui">
      <DashboardCard></DashboardCard>
    </Section>
    <Section title="Quetes">
      <QuestSticker v-for="quest in setup.quests.value"
      v-bind="quest"
      :key="quest.id"
      @click="(e) => setup.openModalQuest(e)"/>
      <Button @click="setup.openModalQuest()" label="Ajouter une quete" variant="placeholder"/>
    </Section>
    <Modal v-show="setup.showModal.value" :show="setup.showModal.value" @close="setup.closeModal()">
      <template v-if="setup.selectedQuest.value !== undefined">
        <QuestModal v-model="setup.selectedQuest.value"/>
      </template>
    </Modal>
    <FooterPlayer @click="(e) => setup.openModalQuest(e)"/>
  </div>
</template>