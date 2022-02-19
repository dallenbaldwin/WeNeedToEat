<script setup lang="ts">
import HelloWorldVue, { type HelloWorldEmits } from '@/components/HelloWorld.vue';
import { reactive, ref } from 'vue';
const handleChat: HelloWorldEmits['chat'] = (payload) => {
  alert(payload);
  count.value++;
  if (count.value > 4) userData.password = 'a-new-password';
};
const message = `Here's a great message`;
const count = ref(0);
const userData = reactive({
  username: 'Dallen Baldwin',
  password: 'a-very-secure-password',
});
</script>

<template>
  <div>Home</div>
  <HelloWorldVue :message="message" v-on:chat="handleChat"></HelloWorldVue>
  <div>You've clicked {{ message }} {{ count }} times!</div>
  <div v-if="count > 3">
    {{ JSON.stringify(userData) }}
  </div>
</template>
