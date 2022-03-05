import { View } from './../router/index';
import { defineStore } from 'pinia';
import {
  getAuth,
  createUserWithEmailAndPassword,
  type Auth,
  type User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import router from '@/router/index';

export const useUserStore = defineStore({
  id: 'user',
  state: (): { user: User | null } => ({ user: null }),
  getters: {
    authenticated(): boolean {
      return !!this.user;
    },
  },
  actions: {
    async stateChanged(): Promise<void> {
      await new Promise((resolve, reject) => {
        onAuthStateChanged(
          getAuth(),
          (user) => {
            if (!user) reject();
            this.user = user;
            resolve(undefined);
          },
          (err) => {
            alert(err);
            reject();
          }
        );
      });
    },
    async login(email: string, password: string) {
      try {
        const { user } = await signInWithEmailAndPassword(getAuth(), email, password);
        this.user = user;
        toHome();
      } catch (err) {
        alert(err);
      }
    },
    async logout() {
      await signOut(getAuth());
      this.user = null;
      router.replace({ name: View.AUTH });
    },
    async register(email: string, password: string) {
      const { user } = await createUserWithEmailAndPassword(getAuth(), email, password);
      this.user = user;
      toHome();
    },
  },
});

const toHome = () => router.replace({ name: View.HOME });
