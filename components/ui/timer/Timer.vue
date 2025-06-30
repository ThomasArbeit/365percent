<script lang="ts" setup>
  import TimerSetup, { type TimerSetupEmits, type TimerSetupProps } from './Timer.setup';
  import Icon from '../icon/Icon.vue';
  const props = defineProps<TimerSetupProps>();
  const emit = defineEmits<TimerSetupEmits>();
  const setup = new TimerSetup(props, emit);
</script>

<template>
  <div class="timer">
    <p :class="['timer__time',{ 'timer__time--hide': !setup.isRunning.value }]" 
      v-show="setup.isRunning.value || setup.wasRunning.value">
      {{ setup.formattedTime }}
    </p>
    <div class="timer__icon">
      <Icon @click.stop="setup.toggle()" :name="setup.isRunning.value ? 'Pause' : 'Play'" :size="20" stroke="#A46AEE" fill="#A46AEE"/>
    </div>
  </div>
</template>