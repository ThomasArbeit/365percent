<script lang="ts" setup>
import Tag from '../tag/Tag.vue';
import { SelectSetup, type SelectSetupEmits, type SelectSetupProps } from './Select.setup';
const props = defineProps<SelectSetupProps>();
const emit = defineEmits<SelectSetupEmits>()
const setup = new SelectSetup(props, emit);
</script>

<template>
  <div class="input">
    <label class="input__label" v-if="props.label">{{ props.label }}</label>
    <div class="input__tag-section">
      <Tag class="input__tag" v-if="setup.displaySelected" :label="setup.displaySelected"/>

      <input v-model="setup.search.value" 
      type="text" 
      @focus="setup.isOpen.value = true" 
      @blur="setup.handleBlur()" 
      :placeholder="!setup.displaySelected ? props.placeholder : undefined"/>
    </div>

  
    <ul class="input__popover" v-if="setup.isOpen.value && setup.search.value && setup.filteredOptions?.length">
      <li
        v-for="option in setup.filteredOptions"
        :key="setup.optionKey(option)"
        :class="[ `${setup.isSelected(option) ? 'selected' : null}`, 'input__popover-option' ]"
        @click.stop="setup.selectOption(option)">
        {{ setup.optionLabel(option) }}
      </li>
    </ul>
  </div>
</template>
