<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import Button from '../components/Button.vue';
import H1 from '@/components/typography/H1.vue';
import Password from '../components/inputs/Password.vue';
import Email from '../components/inputs/Email.vue';

const isLogin = ref(true);
const email = ref('');
const password = ref('');
const { user } = storeToRefs(useUserStore());
const { login, register } = useUserStore();
</script>

<template>
  <div>
    <H1 v-if="isLogin" text="Login" />
    <H1 v-else text="Register" />
    <div class="w-1/2">
      <Email label="Email" v-model="email" />
      <Password label="Password" v-model="password" />
      <div class="flex">
        <div v-if="isLogin">
          <Button @click="() => login()" text="Login" />
        </div>
        <div v-else>
          <Button @click="() => register(email, password)" text="Register" />
        </div>
        <Button
          :text="isLogin ? 'Register' : 'Login'"
          class="ml-auto justify-self-end"
          @click="() => (isLogin = !isLogin)"
          secondary
        />
      </div>
    </div>
  </div>
</template>
