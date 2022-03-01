<script setup lang="ts">
import { Icon } from '@vicons/utils';
import { DarkModeRound, LightModeRound, AccountCircleRound } from '@vicons/material';
import { useDarkStore } from '@/stores/dark';
import { storeToRefs } from 'pinia';
import { View } from '@/router/index';
import { useUserStore } from '@/stores/user';

const { dark } = storeToRefs(useDarkStore());
const { user } = storeToRefs(useUserStore());
const { toggleDark } = useDarkStore();
</script>

<template>
  <nav
    :class="[
      'h-28',
      'sticky',
      'bg-gradient-to-b',
      'from-primary-light',
      'to-white',
      'dark:from-primary-dark',
      'dark:to-black',
    ]"
  >
    <div class="flex justify-end items-center gap-3 mx-12 pt-6">
      <div class="mr-auto">
        <span class="font-semibold">We Need to Eat</span>
        <span class="font-light"> | A simple meal planner</span>
      </div>
      <RouterLink class="font-semibold" to="/">Home</RouterLink>
      <RouterLink class="font-semibold" :to="`/${View.MEALS}`">Meals</RouterLink>
      <RouterLink class="font-semibold" :to="`/${View.ABOUT}`">About</RouterLink>
      <div class="text-dark-primary dark:text-light-primary">
        <Icon class="cursor-pointer" @click="toggleDark" size="32">
          <LightModeRound v-if="dark" />
          <DarkModeRound v-else />
        </Icon>
        <Icon size="32" v-if="user !== undefined">
          <AccountCircleRound />
        </Icon>
      </div>
    </div>
  </nav>
</template>
