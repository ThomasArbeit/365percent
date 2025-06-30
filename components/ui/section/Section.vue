<script lang="ts" setup>
import { SectionSetup, type SectionProps } from './Section.setup';

const props = defineProps<SectionProps>();
const setup = SectionSetup(props);
</script>

<template>
  <div class="section">
    <h2>{{ props.title }}</h2>
    <slot/>
  </div>
</template>