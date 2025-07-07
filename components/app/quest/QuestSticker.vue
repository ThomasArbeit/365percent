<script lang="ts"setup>
import QuestStickerSetup, { type QuestStickerEmit, type QuestStickerProps } from './QuestSticker.setup';
import Sticker from '~/components/ui/sticker/Sticker.vue';
import Icon from '~/components/ui/icon/Icon.vue';
const emits = defineEmits<QuestStickerEmit>();
const props = defineProps<QuestStickerProps>();
const setup = new QuestStickerSetup(props, emits);

</script>


<template>
  <Sticker
  @click="setup.emits?.('click', setup.quest)">
    <div :class="['quest-sticker', `${setup.isSameQuestAsRunning ? 'quest-sticker--isRunning' : '' }`]">
      <div class="quest-sticker__content">
        <div class="quest-sticker__circle"/>
        {{ setup.quest.title }}
      </div>
        <Icon :name="setup.quest.isRunning.value ? 'Pause' : 'Play'" 
        :size="20" 
        :stroke="`${setup.isSameQuestAsRunning ? '#A46AEE' : 'white'}`" 
        :fill="`${setup.isSameQuestAsRunning ? '#A46AEE' : 'white'}`"
        @click.stop="setup.isSameQuestAsRunning ? setup.quest.toggle() : setup.quest.startQuest()"/>
    </div>
  </Sticker>
</template>