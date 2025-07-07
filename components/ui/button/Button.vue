<script lang="ts" setup>
import Icon from '../icon/Icon.vue';
import { ButtonSetup, type ButtonProps } from './Button.setup';
  const props = defineProps<ButtonProps>();
  const setup = ButtonSetup(props);
</script>

<template>
  <button :class="[`button`, `button--${props.variant}`]">
    <Icon v-if="props.iconLeft" :name="props.iconLeft" :stroke="props.variant === 'secondary' ? 'white' : 'black'" :fill="props.fillIcon ? (props.variant === 'secondary' ? 'white' : 'black') : undefined"/>
    {{ props.label }}
    <Icon v-if="props.iconRight" :name="props.iconRight" :stroke="props.variant === 'secondary' ? 'white' : 'black'" :fill="props.fillIcon ? (props.variant === 'secondary' ? 'white' : 'black') : undefined"/>
  </button>
</template>
