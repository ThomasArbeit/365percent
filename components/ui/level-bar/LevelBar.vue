<script lang="ts" setup>
import LevelBarSetup, { type LevelBarSetupEmits, type LevelBarSetupProps } from './LevelBar.setup';
const props = defineProps<LevelBarSetupProps>();
const emits = defineEmits<LevelBarSetupEmits>();
const setup = new LevelBarSetup(props, emits);
</script>


<template>
  <div class="level-bar">
    <div class="level-bar__text-section">
      <p class="level-bar__level">Rank {{ setup.props.level }}</p>
      <p class="level-bar__xp">{{ setup.props.xpCurrentLevel }}/{{ setup.props.xp }} xp</p>
    </div>
    <div class="level-bar__bar-section">
      <div class="level-bar__bar-fixed"/>
      <div class="level-bar__bar-xp" :style="{ width: `${setup.progressPercent}%` }"/>
    </div>
  </div>
</template>