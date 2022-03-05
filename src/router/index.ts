import { useUserStore } from './../stores/user';
import {
  createRouter,
  createWebHistory,
  type NavigationGuard,
  type RouteRecordRaw,
} from 'vue-router';
import AboutVue from '@/views/About.vue';
import HomeView from '@/views/Home.vue';
import MealsVue from '@/views/Meals.vue';
import AuthVue from '@/views/Auth.vue';
import { storeToRefs } from 'pinia';

export enum View {
  HOME = 'home',
  ABOUT = 'about',
  MEALS = 'meals',
  AUTH = 'auth',
}

const navGuard: NavigationGuard = async (to, _, next) => {
  const { stateChanged } = useUserStore();
  try {
    await stateChanged();
    const { authenticated } = useUserStore();
    const insecureViews = [View.ABOUT];
    if (insecureViews.includes(to.name as View)) return next();
    if (!authenticated) {
      router.replace({ name: View.AUTH });
      return next();
    }
  } catch (err) {
    console.log(err);
  } finally {
    next();
  }
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: View.HOME,
      component: HomeView,
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
      beforeEnter: navGuard,
    } as RouteRecordRaw,
  ],
});

export default router;
