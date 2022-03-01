<script setup lang="ts">
import InputWrapper from './InputWrapper.vue';
const { placeholder, modelValue, label } = defineProps({
  placeholder: { type: String },
  modelValue: { type: String },
  label: { type: String },
});
defineEmits(['update:modelValue']);
</script>

<template>
  <InputWrapper :label="label">
    <input
      :class="
        [
          'cursor-text',
          'block',
          'w-full',
          'mb-3',
          'h-10',
          'p-3',
          'bg-primary-light',
          'dark:bg-primary-dark',
          'text-black',
          'dark:text-white',
          'font-light',
          'rounded-xl',
          'border-transparent',
          'focus:ring-0',
          'dark:focus:ring-0',
          'dark:border-none',
          'placeholder:text-right',
          'placeholder:text-black',
          'dark:placeholder:text-white',
        ].join(' ')
      "
      :placeholder="placeholder"
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)" />
  </InputWrapper>
</template>
