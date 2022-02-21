<script setup lang="ts">
import H1 from '@/components/typography/H1.vue';
import H6 from '@/components/typography/H6.vue';
import Button from '@/components/Button.vue';
import { computed, ref } from 'vue';
import Options from '../components/Options.vue';

const eatIn = ref(true);
const toggleEatIn = () => (eatIn.value = !eatIn.value);
const eatInBtnText = computed(() => (eatIn.value ? 'Eat Out' : 'Eat In'));
const eatInText = computed(() =>
  eatIn.value ? `Let's cook a nice meal` : `Eh, we're too lazy tonight. Let's eat out!`
);
const log = (options: string[]) => {
  console.log(options);
};
</script>

<template>
  <H1 text="We really need to eat" />
  <div class="flex items-center justify-start gap-3">
    <H6 text="What should we eat?" />
    <span>{{ eatInText }}</span>
  </div>
  <Button :text="eatInBtnText" @click="toggleEatIn" />
  <Options @options="log" />
</template>
