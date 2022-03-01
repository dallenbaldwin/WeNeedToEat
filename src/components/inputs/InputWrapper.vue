<script setup lang="ts">
import { ref } from 'vue';
const { label } = defineProps({
  label: {
    type: String,
  },
});
</script>

<template>
  <div>
    <div>{{ label }}</div>
    <slot slot="component" />
  </div>
</template>
