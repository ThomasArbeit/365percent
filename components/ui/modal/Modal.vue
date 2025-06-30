<template>
  <Teleport to="body">
    <Transition name="modal-slide">
      <div v-if="show" class="overlay" @click.self="setup.onDismiss">
        <div
          :ref="setup.modal"
          class="bottom-sheet"
          :style="{ transform: `translateY(${setup.translateY.value}px)` }"
          @touchstart="(e) => setup.onTouchStart(e)"
          @touchmove="(e) => setup.onTouchMove(e)"
          @touchend="setup.onTouchEnd()"
        >
          <div :ref="setup.content" class="sheet-content">
            <slot />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ModalSetup } from './Modal.setup';
  const props = defineProps(ModalSetup.props);
  const emit = defineEmits(['close']);
  const setup = new ModalSetup(props, emit);
</script>