<template>
  <div :class="['input', `input--${props.variant}`]">
    <label class="input__label" v-if="props.label">{{ props.label }}</label>
    <textarea
      ref="textarea"
      :placeholder="props.placeholder"
      v-model="props.modelValue"
      @input="setup.onInput"
      @keyup.enter="$emit('enter')"
    />
  </div>
</template>

<script setup lang="ts">
import { TextAreaSetup, type TextAreaEmit, type TextAreaProps } from './TextArea.setup';


const props = defineProps<TextAreaProps>();
const emit = defineEmits<TextAreaEmit>();
const textarea = ref<HTMLTextAreaElement | null>(null);
const setup = new TextAreaSetup(props, emit, textarea);
</script>