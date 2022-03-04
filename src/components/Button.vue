<script setup lang="ts">
import { computed, ref } from 'vue';

export interface ButtonProps {
  text: string;
  primary?: boolean;
  secondary?: boolean;
  disabled?: boolean;
  //   success?: boolean;
  //   info?: boolean;
  //   warning?: boolean;
  //   danger?: boolean;
}
const props = defineProps<ButtonProps>();

// @ts-expect-error when this is mounted, it will not be null
const button = ref<HTMLButtonElement>(null);

const theme = computed(() => {
  if (props.disabled) return '';
  else if (props.secondary) return 'bg-secondary-light dark:bg-secondary-dark';
  else return 'bg-primary-light dark:bg-primary-dark';
});

const translate = () => {
  const classes = ['translate-x-[1px]', 'translate-y-[1px]'];
  const each = () => classes.forEach((c) => button?.value.classList.toggle(c));
  each();
  setTimeout(() => each(), 200);
};
</script>

<template>
  <button
    :disabled="props.disabled ?? false"
    ref="button"
    @click="translate"
    :class="[
      theme,
      'btn',
      'font-light',
      'rounded-xl',
      'border-transparent',
      'border-[1px]',
      'hover:opacity-75',
      'duration-300',
      'hover:border-black',
      'dark:hover:border-white',
      'disabled:text-white',
      'dark:disabled:text-black',
      'disabled:bg-secondary-light',
      'dark:disabled:bg-secondary-dark',
      'disabled:cursor-not-allowed',
    ]"
  >
    <span class="flex items-center justify-center gap-1 p-3">{{ text }}</span>
  </button>
</template>

<style scoped>
.btn {
  min-height: 2.5rem;
  min-width: 2.5rem;
}
</style>
