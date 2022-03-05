import { storeToRefs } from 'pinia';
import { useUserStore } from './../stores/user';
import {
  createRouter,
  createWebHistory,
  type NavigationGuard,
  type RouteRecordRaw,
} from 'vue-router';
import AboutVue from '@/views/About.vue';
import HomeVue from '@/views/Home.vue';
import MealsVue from '@/views/Meals.vue';
import AuthVue from '@/views/Auth.vue';

export enum View {
  HOME = 'home',
  ABOUT = 'about',
  MEALS = 'meals',
  AUTH = 'auth',
}

const navGuard: NavigationGuard = async (to, __, next) => {
  const { authenticated } = storeToRefs(useUserStore());
  const { stateChanged } = useUserStore();
  await stateChanged();
  if (!authenticated.value) router.replace({ name: View.AUTH });
  if (authenticated.value && to.name === View.AUTH) router.replace({ name: View.HOME });
  next();
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: View.HOME,
      component: HomeVue,
      beforeEnter: navGuard,
    },
    {
      path: `/${View.ABOUT}`,
      name: View.ABOUT,
      component: AboutVue,
      beforeEnter: navGuard,
    },
    {
      path: `/${View.MEALS}`,
      name: View.MEALS,
      component: MealsVue,
      beforeEnter: navGuard,
    },
    {
      path: `/${View.AUTH}`,
      name: View.AUTH,
      component: AuthVue,
    },
  ],
});

export default router;
