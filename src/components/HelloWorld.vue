<script setup lang="ts">
export interface HelloWorldEmits {
  chat(e: 'chat', payload: string): void;
}
defineProps({
  message: { default: 'A message' },
});
defineEmits<HelloWorldEmits>();
</script>

<template>
  <div @click="() => $emit('chat', `here's the payload!`)">
    {{ message }}
  </div>
</template>
