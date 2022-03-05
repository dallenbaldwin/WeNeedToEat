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
const { login, register } = useUserStore();
</script>

<template>
  <div>
    <H1 v-if="isLogin" text="Login" />
    <H1 v-else text="Register" />
    <div class="w-1/2">
      <Email label="Email" v-model="email" />
      <Password label="Password" v-model="password" />
      <!-- TODO add second password for register -->
      <div class="flex justify-end">
        <Button
          :text="isLogin ? 'Register' : 'Login'"
          class="mr-auto justify-self-start"
          @click="() => (isLogin = !isLogin)"
          secondary
        />
        <div v-if="isLogin">
          <Button @click="() => login(email, password)" text="Login" />
        </div>
        <div v-else>
          <Button @click="() => register(email, password)" text="Register" />
        </div>
      </div>
    </div>
  </div>
</template>
