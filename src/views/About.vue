<script setup lang="ts">
import H1 from '../components/typography/H1.vue';
import H3 from '../components/typography/H3.vue';
import P from '../components/typography/P.vue';
import H6 from '../components/typography/H6.vue';
import Button from '../components/Button.vue';
import { ref } from 'vue';
import Fade from '../components/transitions/Fade.vue';

const deleteCounter = ref(0);
const deleteAccount = () => {
  deleteCounter.value++;
  if (deleteCounter.value < 2) return;
  deleteCounter.value = 0;
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
  <H3>Buy me a 🍺</H3>
  <P
    >This project is completely free to use. If too many people use it, it will start
    eating a hole in my pocket.</P
  >
  <P
    >If you are feeling generous or feel I deserve any money at all for this little
    service, feel free to send me a tip via Venmo</P
  >
  <H3>Privacy</H3>
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
    text="Delete my data"
    :danger="deleteCounter > 0"
    :secondary="deleteCounter === 0"
    @click="deleteAccount"
  />
  <H3>For the Nerds</H3>
</template>
