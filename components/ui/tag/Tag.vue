<script lang="ts" setup>
import TagSetup, { type TagSetupEmits, type TagSetupProps } from './Tag.setup';
const emits = defineEmits<TagSetupEmits>();
const props = defineProps<TagSetupProps>();
const setup = new TagSetup(props, emits);
</script>

<template>
  <div class="tag">
    <div class="tag__circle"/>
    {{ props.label }}
  </div>
</template>