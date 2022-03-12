<script setup lang="ts">
import H1 from '../components/typography/H1.vue';
import H3 from '../components/typography/H3.vue';
import P from '../components/typography/P.vue';
import H6 from '../components/typography/H6.vue';
import Button from '../components/Button.vue';
import { ref } from 'vue';
import Fade from '../components/transitions/Fade.vue';
import List from '@/components/typography/List.vue';
import { foodmojis } from '@/utils/foodmojis';

const deleteCounter = ref(0);
const deleteAccount = () => {
  deleteCounter.value++;
  if (deleteCounter.value === 1) return;
  deleteCounter.value = 0;
  // TODO
  alert('Coming soon!');
};
</script>

<template>
  <H1>About</H1>
  <P>
    We Need to Eat is a simple meal planner I built for my wife and I. Sometimes we have a
    really hard time picking what to eat because nothing sounds good until it does.
  </P>
  <P> Hopefully this little tool can work as well for you as it does for us! </P>
  <H3>Features</H3>
  <P
    >We Need to Eat is a simple tool, but that doesn't mean it doesn't have great
    features</P
  >
  <List
    :items="[
      'Default Dark theme & available Light theme',
      'List your favorite at home cooked meals or restaurants',
      'Ingredient list for home cooked meals with space for the Recipe',
      'Data saved in the cloud. Log in on your phone, tablet, or computer',
      'Random meal picker',
      'Tags to categorize and filter meals even further',
      'Pick as many random meals as you like and generate a shopping list',
    ]"
    :points="foodmojis"
  />
  <H3>Buy me a 🍺</H3>
  <P
    >This tool is completely free to use. If too many people use it, it will start eating
    a hole in my pocket.</P
  >
  <P
    >If you are feeling generous or feel I deserve any money at all for this little
    service, feel free to send me a tip via Venmo</P
  >
  <H3>Privacy</H3>
  <P
    >We Need to Eat collects and stores as much information as you willingly enter into
    the application.</P
  >
  <P
    >I'm not in the business of selling any data to any external 3rd party. Even if by
    some miracle this tool takes off and 3rd parties want to supplement or fund my
    endeavors, your data will not be a contingency. As mentioned above, this tool is
    completely free to use and depends on the generous donations of users like you.</P
  >
  <P
    >This application uses Firebase for authentication and data storage. The email you
    provide is registered with Firebase to generate a unique user identifier. I use this
    identifier to store and relate your data in a Firebase service called Firestore
    Database.</P
  >
  <H6>I want to Delete my Account</H6>
  <P>I'm so sad to see you go!</P>
  <P
    >Lucky for both of us, this project is built off the backs of talented people at
    Google who manage the Firebase platform. All it should take is a simple click of this
    button and all data associated with your account, along with your account, will be
    completely removed from Firebase's authentication and cloud database services.</P
  >
  <Fade>
    <P v-if="deleteCounter > 0" class="text-danger-light dark:text-danger-dark"
      >This action cannot be undone... Are you sure you want to continue?</P
    >
  </Fade>
  <Button
    class="mb-3"
    text="Delete my data"
    :danger="deleteCounter === 1"
    :secondary="deleteCounter === 0"
    @click="deleteAccount"
  />
  <H3>For the Nerds</H3>
  <H6>Client Side</H6>
  <List
    :items="['Vue 3', 'Vite', 'Pinia', 'Vue Router', 'TailwindCSS', 'XIcons', 'GitHub']"
  />
  <H6>Server Side</H6>
  <List :items="['Netlify', 'Firebase Authentication', 'Firestore Database']" />
</template>
