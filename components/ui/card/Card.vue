<template>
  <div class="card" @click="$emit('click')">
    <slot/>
  </div>
</template>

<script lang="ts" setup>
import { CardSetup, type CardEmit } from './Card.setup';
const emit = defineEmits<CardEmit>()
const setup = CardSetup(emit);
</script>