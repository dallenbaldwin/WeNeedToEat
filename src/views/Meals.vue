<script setup lang="ts">
import H1 from '../components/typography/H1.vue';
import { atHome } from '@/db/utils/Repository';
import Button from '../components/Button.vue';
import type { AtHome } from '@/db/entities/AtHome.entity';

const createAtHome = async () => {
  const meal = {
    name: 'some new meal',
    userId: 'a-user-id',
  } as AtHome;
  const newMeal = await atHome.create(meal);
  console.log(newMeal);
};
</script>

<template>
  <H1>Meals</H1>
  <Button text="create at home meal" @click="createAtHome" />
</template>
