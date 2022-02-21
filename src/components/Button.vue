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

const classes = computed(() => {
  const classes: string[] = [];
  if (props.disabled) return classes.join('');
  else if (props.secondary)
    classes.push(
      'from-light-secondary',
      'to-gray-100',
      'hover:from-gray-100',
      'hover:to-light-secondary',
      'dark:from-dark-secondary',
      'dark:to-gray-800',
      'dark:hover:from-gray-800',
      'dark:hover:to-dark-secondary'
    );
  else
    classes.push(
      'from-light-primary',
      'to-cyan-100',
      'hover:from-cyan-100',
      'hover:to-light-primary',
      'dark:from-dark-primary',
      'dark:to-fuchsia-800',
      'dark:hover:from-fuchsia-800',
      'dark:hover:to-dark-primary'
    );
  return classes.join(' ');
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
      classes,
      'btn',
      'font-light',
      'rounded-xl',
      'bg-gradient-to-b',
      'disabled:text-white',
      'dark:disabled:text-black',
      'disabled:bg-gray-400',
      'dark:disabled:bg-gray-600',
      'disabled:cursor-not-allowed',
    ]">
    <span class="flex items-center justify-center gap-1 p-3">{{ text }}</span>
  </button>
</template>

<style scoped>
.btn {
  min-height: 2.5rem;
  min-width: 2.5rem;
}
</style>
