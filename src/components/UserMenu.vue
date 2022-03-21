<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import H3 from './typography/H3.vue';
import H6 from './typography/H6.vue';
import { Icon } from '@vicons/utils';
import { AccountCircleRound, SettingsRound } from '@vicons/material';
import Button from './Button.vue';
import LightDark from './LightDark.vue';
import Textbox from '@/components/inputs/Textbox.vue';
import { UsersClient } from '@/db/utils/FirestoreClient';
import type { User } from '@/db/models/User.model';

const { user } = storeToRefs(useUserStore());
const { logout } = useUserStore();
const visible = ref(false);
const settings = ref(false);
const nickname = ref('');
const save = async () => {
  settings.value = !settings.value;
  nickname.value = '';
  await UsersClient.save({
    id: user.value?.uid,
    nickname: nickname.value,
  });
};
onMounted(async () => {
  const { nickname: _nickname } = await UsersClient.get(user.value?.uid!);
  nickname.value = _nickname ?? '';
});
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
        'bg-white',
        'dark:bg-black',
        'rounded-xl',
        'p-3',
        'border-2',
        'border-solid',
        'border-black',
        'dark:border-white',
        'min-w-[400px]',
      ]"
    >
      <div class="flex justify-between">
        <H3>User</H3>
        <Icon
          size="32"
          @click="() => (settings = !settings)"
          class="cursor-pointer hover:opacity-75 duration-300"
        >
          <SettingsRound />
        </Icon>
      </div>
      <div>
        <div>{{ user?.displayName ?? user?.email }}</div>
        <div v-if="settings">
          <div class="flex justify-between">
            <H6>Nickname</H6>
            <Textbox label="Nickname" v-model="nickname" />
          </div>
          <div class="flex justify-between">
            <H6>Theme</H6>
            <LightDark />
          </div>
        </div>
        <Button v-if="settings" text="Save" @click="save" class="float-right mt-6" />
        <Button v-else text="Logout" @click="logout" class="float-right mt-6" />
      </div>
    </div>
  </div>
</template>
