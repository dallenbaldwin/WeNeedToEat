<script setup lang="ts">
import { useDarkStore } from '@/stores/dark';
import { storeToRefs } from 'pinia';
import { Icon } from '@vicons/utils';
import { LightModeRound, DarkModeRound } from '@vicons/material';

const { dark } = storeToRefs(useDarkStore());
const { toggleDark } = useDarkStore();
</script>

<template>
  <Icon
    class="cursor-pointer hover:opacity-75 duration-300"
    @click="toggleDark"
    size="32"
  >
    <LightModeRound v-if="dark" />
    <DarkModeRound v-else />
  </Icon>
</template>
