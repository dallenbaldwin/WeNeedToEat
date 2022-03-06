<script setup lang="ts">
import { ref } from 'vue';
import H6 from './typography/H6.vue';
import { Icon } from '@vicons/utils';
import { CloseFilled } from '@vicons/material';
import Button from './Button.vue';
import { useEatInStore } from '@/stores/eatIn';
import { storeToRefs } from 'pinia';
import Textbox from './inputs/Textbox.vue';
import router, { View } from '@/router';

const inputs = ref<string[]>([]);
const nextValue = ref<string>('');
const meals = ref<string[]>(['mexican', 'chinese']);
const { eatIn } = storeToRefs(useEatInStore());

const addToList = () => {
  if (!nextValue.value.trim().length) return;
  inputs.value.push(
    ...nextValue.value
      .split(',')
      .map((v) => v.trim())
      .filter((v) => v.length)
  );
  nextValue.value = '';
};
const reset = () => {
  inputs.value = [];
};
const remove = (input: string) => {
  inputs.value = inputs.value.filter((v) => v !== input);
};
const whatToEat = () => {
  console.log(inputs.value, eatIn.value);
};
const toMeals = () => {
  router.replace({ name: View.MEALS });
};
</script>

<template>
  <div class="flex gap-1 items-center justify-start">
    <H6>Options</H6>
    <Icon @click="reset" class="cursor-pointer"><CloseFilled /></Icon>
  </div>
  <Textbox v-model="nextValue" @change="addToList" />
  <div
    :class="
      ['flex', 'justify-start', 'items-center', 'mb-3', 'gap-1', 'flex-wrap'].join(' ')
    "
  >
    <div
      v-for="(input, i) of inputs"
      :key="i"
      :class="
        ['bg-primary-light', 'dark:bg-primary-dark', 'rounded-3xl', 'px-3', 'py-1'].join(
          ' '
        )
      "
    >
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
  <div class="flex justify-between">
    <Button text="Well tell us what to eat already!" @click="whatToEat" />
    <Button text="What are the options again?" @click="toMeals" />
  </div>
</template>
