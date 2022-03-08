<script setup lang="ts">
import { type PropType, computed } from 'vue';
import { Icon } from '@vicons/utils';
import { CircleRound } from '@vicons/material';

const props = defineProps({
  items: {
    required: true,
    type: Array as PropType<Array<string>>,
  },
  points: {
    required: false,
    type: Array as PropType<Array<string>>,
  },
});
const random = (text: string) => Math.round(Math.random() * Number(text.charCodeAt(1)));
const pointsToDisplay = computed(() =>
  props.points?.sort((a, b) => random(a) - random(b))
);
</script>

<template>
  <div class="mb-2">
    <div v-for="(item, i) of items" :key="i" class="mb-1 ml-3 text-lg font-light">
      <span v-if="pointsToDisplay">{{ pointsToDisplay[i] }}</span>
      <Icon v-else size="12" class="text-primary-light dark:text-primary-dark">
        <CircleRound />
      </Icon>
      <span class="ml-2">{{ item }}</span>
    </div>
  </div>
</template>
