import { createRouter, createWebHistory } from 'vue-router';
import AboutVue from '@/views/About.vue';
import HomeView from '@/views/Home.vue';
import MealsVue from '@/views/Meals.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutVue,
    },
    {
      path: '/meals',
      name: 'meals',
      component: MealsVue,
    },
  ],
});

export default router;
