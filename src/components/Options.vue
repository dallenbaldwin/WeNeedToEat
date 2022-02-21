<script setup lang="ts">
import { ref } from 'vue';
import H6 from './typography/H6.vue';
import { Icon } from '@vicons/utils';
import { CloseFilled } from '@vicons/material';

const emit = defineEmits<{ (e: 'options', options: string[]): void }>();

const inputs = ref<string[]>([]);
const nextValue = ref<string>('');
const sendOptions = () => {
  emit('options', inputs.value);
};
const addToList = () => {
  if (!nextValue.value.length) return;
  inputs.value.push(...nextValue.value.split(',').map((v) => v.trim()));
  nextValue.value = '';
  sendOptions();
};
const reset = () => {
  inputs.value = [];
  sendOptions();
};
const remove = (input: string) => {
  inputs.value = inputs.value.filter((v) => v !== input);
  sendOptions();
};
</script>

<template>
  <div class="flex gap-1 items-center justify-start">
    <H6 text="Options" />
    <Icon @click="reset" class="cursor-pointer"><CloseFilled /></Icon>
  </div>
  <input
    :class="
      [
        'cursor-text',
        'block',
        'w-full',
        'mb-3',
        'h-10',
        'p-3',
        'align-middle',
        'bg-light-primary',
        'dark:bg-dark-primary',
        'text-black',
        'dark:text-white',
        'font-light',
        'rounded-xl',
        'focus:dark:border-white',
        'focus:border-black',
      ].join(' ')
    "
    type="text"
    v-model="nextValue"
    @change="addToList" />
  <div
    :class="
      ['flex', 'justify-start', 'items-center', 'mb-3', 'gap-1', 'flex-wrap'].join(' ')
    ">
    <div
      v-for="(input, i) of inputs"
      :key="i"
      :class="
        ['bg-light-primary', 'dark:bg-dark-primary', 'rounded-3xl', 'px-3', 'py-1'].join(
          ' '
        )
      ">
      <span
        :class="
          [
            'flex',
            'justify-center',
            'font-light',
            'items-center',
            'gap-1',
            'text-ellipsis',
            'whitespace-nowrap',
          ].join(' ')
        "
        >{{ input }}
        <Icon class="cursor-pointer" @click="remove(input)"><CloseFilled /></Icon
      ></span>
    </div>
  </div>
</template>
