<template>
  <div>About</div>
  <div @click="increment">
    <p>
      here's a composition function demo from
      <a href="https://www.danvega.dev/blog/2020/02/12/vue3-ref-vs-reactive/"
        >a tutorial</a
      >
      I found while deciding how to use ref vs reactive
    </p>
    <div>{{ x }}, {{ y }}</div>
    <div>Counter State: {{ $state.counter }}</div>
    <div>Double Counter: {{ double }}</div>
  </div>
</template>

<script setup lang="ts">
import { useMousePosition } from '@/composition-functions/useMousePosition';
import { useCounterStore } from '@/stores/counter';
import { ref } from 'vue';

const { $state, doubleCount, increment } = useCounterStore();

const double = ref(doubleCount);

const { x, y } = useMousePosition();
</script>
