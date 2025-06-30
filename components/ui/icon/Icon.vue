<script lang="ts" setup>
import IconSetup, { type IconSetupProps } from './Icon.setup';

const props = defineProps<IconSetupProps>();
const setup = new IconSetup(props);
</script>

<template>
  <component
    :is="setup.icon"
    :size="props.size"
    :color="props.color"
    :stroke-width="props.strokeWidth" :default-class="defaultClass"
  />
</template>