<script lang="ts" setup>
import FooterPlayerSetup, { type FooterPlayerSetupEmits, type FooterPlayerSetupProps } from './FooterPlayer.setup';
import Icon from '../icon/Icon.vue';
const emits = defineEmits<FooterPlayerSetupEmits>()
  const props = defineProps<FooterPlayerSetupProps>();
  const setup = new FooterPlayerSetup(props, emits);
</script>

<template>
  <div :class="['footer-player',`${setup.playingQuest.hasQuest.value ? 'footer-player--playing': ''}`, `${!setup.playingQuest.quest?.isRunning.value ? 'footer-player--paused': ''}`]" @click.stop="setup.handleClick()">
    <template v-if="setup.playingQuest.hasQuest.value">
      <div class="footer-player__content">
        <p class="footer-player__title">{{ setup.playingQuest.quest?.title }}</p>
        <p class="footer-player__description">{{ setup.playingQuest.quest?.description }}</p>
      </div>
      <div class="footer-player__actions">
        <p class="footer-player__time" v-show="setup.playingQuest.quest?.timeInterval.value !== 0">
          {{ setup.playingQuest.quest?.formattedTime }}
        </p>
        <Icon :name="'CircleCheckBig'" :size="20" stroke="white" :stroke-width="2"/>
        <Icon :name="setup.playingQuest.quest?.isRunning.value ? 'Pause' : 'Play'" :size="20" stroke="white" fill="white" style="stroke-linejoin:round;" @click.stop="setup.playingQuest.quest?.toggle()"/>
      </div>
    </template>
  </div>
</template>