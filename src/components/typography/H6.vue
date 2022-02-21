<script setup lang="ts">
export interface H6Props {
  text: string;
}
defineProps<H6Props>();
</script>

<template>
  <div class="text-xl font-semibold">
    {{ text }}
  </div>
</template>
