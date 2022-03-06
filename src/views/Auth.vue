<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { computed, ref } from 'vue';
import Button from '../components/Button.vue';
import H1 from '@/components/typography/H1.vue';
import Password from '../components/inputs/Password.vue';
import Email from '../components/inputs/Email.vue';
import P from '../components/typography/P.vue';
import Fade from '../components/transitions/Fade.vue';

const isLogin = ref(true);
const email = ref('');
const password = ref('');
const verify = ref('');
const { login, register } = useUserStore();
const match = computed(() =>
  !isLogin.value && password.value.length > 0 ? password.value === verify.value : true
);
const toggleType = () => {
  isLogin.value = !isLogin.value;
  password.value = '';
  verify.value = '';
};
</script>

<template>
  <div>
    <H1 v-if="isLogin">Login</H1>
    <H1 v-else>Register</H1>
    <div class="w-1/2">
      <Email label="Email" v-model="email" />
      <Password label="Password" v-model="password" />
      <Password label="Verify Password" v-model="verify" v-if="!isLogin" />
      <Fade>
        <P v-if="!match" class="text-danger-light dark:text-danger-dark">
          Passwords must match!
        </P>
      </Fade>
      <div class="flex justify-end">
        <Button
          :text="isLogin ? 'Register' : 'Login'"
          class="mr-auto justify-self-start"
          @click="toggleType"
          secondary
        />
        <Button v-if="isLogin" @click="() => login(email, password)" text="Login" />
        <Button
          :disabled="!match"
          v-else
          @click="() => register(email, password)"
          text="Register"
        />
      </div>
    </div>
  </div>
</template>
