<script setup lang="ts">
import { onBeforeMount, onMounted } from 'vue';
import { RouterView } from 'vue-router';
import { useDarkStore } from './stores/dark';
import Navbar from './components/Navbar.vue';
import { useUserStore } from './stores/user';

onBeforeMount(async () => {
  const { stateChanged } = useUserStore();
  await stateChanged();
});

onMounted(() => {
  const { dark } = useDarkStore();
  if (!dark) return;
  document.documentElement.classList.add('dark');
});
</script>

<template>
  <Navbar />
  <div class="container mx-auto">
    <RouterView />
  </div>
</template>

<style></style>
