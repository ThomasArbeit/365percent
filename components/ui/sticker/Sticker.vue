<script lang="ts" setup>
import { StickerSetup, type StickerEmit } from './Sticker.setup';
const emit = defineEmits<StickerEmit>();
const setup = StickerSetup(emit);
</script>

<template>
  <div class="sticker" @click="$emit('click')">
    <slot/>
  </div>
</template>