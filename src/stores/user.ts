import { defineStore } from 'pinia';
import {
  getAuth,
  createUserWithEmailAndPassword,
  type Auth,
  type User,
  onAuthStateChanged,
} from 'firebase/auth';

// https://learnvue.co/2021/06/a-vue-firebase-authentication-tutorial-vue-3-and-firebase/#adding-firebase-to-vue3
export const useUserStore = defineStore({
  id: 'user',
  state: (): { auth: Auth; user: User | null } => ({ auth: getAuth(), user: null }),
  getters: {
    authenticated(): boolean {
      onAuthStateChanged(this.auth, (user) => {
        if (!user) this.user = user;
      });
      return this.user !== null;
    },
  },
  actions: {
    login() {},
    logout() {},
    async register(email: string, password: string) {
      const { user } = await createUserWithEmailAndPassword(this.auth, email, password);
      this.user = user;
    },
  },
});
