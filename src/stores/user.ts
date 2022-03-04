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
  state: (): { _auth: Auth; user: User | null } => ({ _auth: getAuth(), user: null }),
  getters: {
    authenticated(): boolean {
      return !!this.user;
    },
    //  authenticated(): Promise<boolean> {
    //    return new Promise((resolve, reject) => {
    //      onAuthStateChanged(
    //        this._auth,
    //        (user) => resolve(!!user),
    //        (err) => reject(err)
    //      );
    //    });
    //  },
  },
  actions: {
    async login(email: string, password: string) {
      try {
        const { user } = await signInWithEmailAndPassword(this._auth, email, password);
        this.user = user;
        toHome();
      } catch (err) {
        alert(err);
      }
    },
    async logout() {
      await signOut(this._auth);
      this.user = null;
      router.replace({ name: View.AUTH });
    },
    async register(email: string, password: string) {
      const { user } = await createUserWithEmailAndPassword(this._auth, email, password);
      this.user = user;
      toHome();
    },
  },
});

const toHome = () => router.replace({ name: View.HOME });
