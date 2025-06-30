<script lang="ts" setup>
import { ButtonSetup, type ButtonProps } from './Button.setup';
  const props = defineProps<ButtonProps>();
  const setup = ButtonSetup(props);
</script>

<template>
  <button :class="[`button`, `button--${props.variant}`]">
    {{ props.label }}
  </button>
</template>
