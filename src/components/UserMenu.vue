<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import H3 from './typography/H3.vue';
import { Icon } from '@vicons/utils';
import { AccountCircleRound } from '@vicons/material';
import Button from './Button.vue';
import LightDark from './LightDark.vue';

const { user } = storeToRefs(useUserStore());
const { logout } = useUserStore();
const visible = ref(false);
</script>

<template>
  <div class="relative">
    <Icon
      class="justify-self-center cursor-pointer hover:opacity-75 duration-300"
      size="32"
      @click="() => (visible = !visible)"
    >
      <AccountCircleRound />
    </Icon>
    <div
      v-show="visible"
      :class="[
        'z-50',
        'absolute',
        'top-12',
        'right-3',
        'bg-primary-light',
        'dark:bg-primary-dark',
        'rounded-xl',
        'p-3',
        'min-w-[200px]',
      ]"
    >
      <div class="flex justify-between">
        <H3>User</H3>
        <LightDark />
      </div>
      <div>
        <div>{{ user?.displayName ?? user?.email }}</div>
        <Button text="Logout" @click="logout" class="float-right mt-6" secondary />
      </div>
    </div>
  </div>
</template>
