<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { View } from '@/router/index';
import { useUserStore } from '@/stores/user';
import UserMenu from './UserMenu.vue';
import LightDark from './LightDark.vue';

const { user } = storeToRefs(useUserStore());
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
      <UserMenu v-if="!!user" />
      <LightDark v-else />
    </div>
  </nav>
</template>
