<script setup lang="ts">
import { ref } from 'vue';
import { Icon } from '@vicons/utils';
import { RemoveRedEyeRound, DisabledVisibleRound } from '@vicons/material';
import InputWrapper from './InputWrapper.vue';

const { modelValue, label } = defineProps({
  modelValue: { type: String },
  label: { type: String },
});
defineEmits(['update:modelValue']);

const show = ref(false);
</script>

<template>
  <InputWrapper :label="label">
    <div class="flex items-center justify-start w-full gap-1 mb-3">
      <input
        :class="
          [
            'cursor-text',
            'w-full',
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
        :type="show ? 'text' : 'password'"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />
      <Icon
        class="justify-self-end cursor-pointer"
        size="24"
        @click="() => (show = !show)"
      >
        <DisabledVisibleRound v-if="show" />
        <RemoveRedEyeRound v-else />
      </Icon>
    </div>
  </InputWrapper>
</template>
