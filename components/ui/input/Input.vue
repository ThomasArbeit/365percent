<template>
  <div :class="['input', `input--${props.variant}`, `input--${props.size}`]">
    <label class="input__label" v-if="props.label">{{ props.label }}</label>
    <input
      :type="props.type"
      :placeholder="props.placeholder"
      v-model="props.modelValue"
      @input="setup.onInput"
      @keyup.enter="$emit('enter')"
    />
  </div>
</template>

<script setup lang="ts">
import { InputSetup, type InputEmit, type InputProps } from './Input.setup';

const props = defineProps<InputProps>();
const emit = defineEmits<InputEmit>();
const setup = InputSetup(props, emit);
</script>