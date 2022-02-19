<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import { useDarkStore } from './stores/dark';

onMounted(() => {
  const { dark } = useDarkStore();
  if (!dark) return;
  document.documentElement.classList.add('dark');
});
</script>

<template>
  <RouterLink to="/">Home</RouterLink>
  <RouterLink to="/about">About</RouterLink>
  <RouterView />
</template>

<style></style>
