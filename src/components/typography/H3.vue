<script setup lang="ts">
export interface H3Props {
  text: string;
}
defineProps<H3Props>();
</script>

<template>
  <div class="font-light text-4xl">
    {{ text }}
  </div>
</template>
