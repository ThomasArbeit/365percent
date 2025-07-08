<template>
  <div :class="['input', `input--${props.variant}`]">
    <label class="input__label" v-if="props.label">{{ props.label }}</label>
    <!-- Zone d'affichage des tags -->
    <div class="flex flex-wrap gap-1 mb-1">
      <span
        v-for="(tag, index) in selectedTags"
        :key="index"
        class="bg-blue-100 text-blue-800 px-2 py-1 rounded flex items-center text-sm"
      >
        {{ tag }}
        <button @click="removeTag(index)" class="ml-1 text-blue-600 hover:text-red-500">&times;</button>
      </span>
    </div>

    <!-- Input -->
    <input
      v-model="search"
      @focus="isOpen = true"
      @blur="handleBlur"
      @keydown.enter.prevent="addTag"
      @input="filterOptions"
      type="text"
      class="w-full border border-gray-300 p-2 rounded"
      placeholder="Écris ou sélectionne..."
    />

    <!-- Popover des options -->
    <ul
      v-if="isOpen && filteredOptions.length"
      class="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded shadow max-h-40 overflow-auto"
    >
      <li
        v-for="option in filteredOptions"
        :key="option"
        @mousedown.prevent="selectOption(option)"
        class="p-2 hover:bg-gray-100 cursor-pointer"
      >
        {{ option }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  label: String,
  modelValue: String,
  options: {
    type: Array,
    default: () => []
  }
})

const emits = defineEmits(['update:modelValue'])

const search = ref('')
const isOpen = ref(false)
const filteredOptions = ref([...props.options])
const selectedTags = ref([])

// Filtrer les options selon l'input
const filterOptions = () => {
  const lower = search.value.toLowerCase()
  filteredOptions.value = props.options.filter(opt =>
    opt.toLowerCase().includes(lower) &&
    !selectedTags.value.includes(opt)
  )
}

// Ajouter un tag avec Entrée
const addTag = () => {
  const text = search.value.trim()
  if (text && !selectedTags.value.includes(text)) {
    selectedTags.value.push(text)
    emits('update:modelValue', selectedTags.value)
  }
  search.value = ''
  filterOptions()
}

// Sélection d'une option
const selectOption = (option) => {
  if (!selectedTags.value.includes(option)) {
    selectedTags.value.push(option)
    emits('update:modelValue', selectedTags.value)
  }
  search.value = ''
  isOpen.value = false
  filterOptions()
}

// Supprimer un tag
const removeTag = (index) => {
  selectedTags.value.splice(index, 1)
  emits('update:modelValue', selectedTags.value)
  filterOptions()
}

// Gestion du blur (laisser le temps au click)
const handleBlur = () => {
  setTimeout(() => {
    isOpen.value = false
  }, 100)
}
</script>

