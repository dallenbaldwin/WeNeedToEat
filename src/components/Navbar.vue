<script setup lang="ts">
import { Icon } from '@vicons/utils';
import { DarkModeRound, LightModeRound } from '@vicons/material';
import { useDarkStore } from '@/stores/dark';
import { ref } from 'vue';

const { dark, $subscribe, toggleDark } = useDarkStore();
const isDark = ref(dark);
$subscribe((_, { dark }) => {
  isDark.value = dark;
});
</script>

<template>
  <nav
    class="h-28 sticky bg-gradient-to-b from-light-primary to-white dark:from-dark-primary dark:to-black">
    <div class="flex justify-end items-center gap-3 mx-12 pt-6">
      <div class="mr-auto">
        <span class="font-semibold">We Need to Eat</span>
        <span class="font-light"> | A simple meal planner</span>
      </div>
      <RouterLink class="font-semibold" to="/">Home</RouterLink>
      <RouterLink class="font-semibold" to="/meals">Meals</RouterLink>
      <RouterLink class="font-semibold" to="/about">About</RouterLink>
      <Icon
        class="text-dark-primary dark:text-light-primary cursor-pointer"
        @click="toggleDark"
        size="32">
        <LightModeRound v-if="isDark" />
        <DarkModeRound v-else />
      </Icon>
    </div>
  </nav>
</template>
