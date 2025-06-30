<script lang="ts" setup>
import Modal from '~/components/ui/modal/Modal.vue';
import { defaultSetup } from './defaultSetup';
const setup = new defaultSetup();
</script>

<template>
  <div class="layout">
    <main class="content">
      <NuxtPage />
    </main>
  </div>
</template>