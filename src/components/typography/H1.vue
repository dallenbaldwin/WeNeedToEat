<script setup lang="ts">
export interface H1Props {
  text: string;
}
defineProps<H1Props>();
</script>

<template>
  <div class="text-7xl mb-3 mt-1 text-ellipsis font-thin">
    {{ text }}
  </div>
</template>
