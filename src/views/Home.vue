<script setup lang="ts">
import H1 from '@/components/typography/H1.vue';
import H6 from '@/components/typography/H6.vue';
import Button from '@/components/Button.vue';
import { computed } from 'vue';
import Options from '../components/Options.vue';
import { storeToRefs } from 'pinia';
import { useEatInStore } from '@/stores/eatIn';
import router, { View } from '@/router';

const { eatIn } = storeToRefs(useEatInStore());
const { toggleEatIn } = useEatInStore();
const eatInBtnText = computed(() => (eatIn.value ? 'Eat Out' : 'Eat In'));
const eatInText = computed(() =>
  eatIn.value ? `Let's cook a nice meal` : `Eh, we're too lazy tonight. Let's eat out!`
);
const toMeals = () => {
  router.replace({ name: View.MEALS });
};
</script>

<template>
  <H1 text="We really need to eat" />
  <div class="flex items-center justify-start gap-3">
    <H6 text="What should we eat?" />
    <span>{{ eatInText }}</span>
    <span class="mr-auto" />
    <Button text="What are the options again?" @click="toMeals" />
  </div>
  <Button :text="eatInBtnText" @click="toggleEatIn" />
  <div class="mt-3">
    <Options />
  </div>
</template>
