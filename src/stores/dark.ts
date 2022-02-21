import { defineStore } from 'pinia';

export const useDarkStore = defineStore({
  id: 'dark',
  state: () => ({ dark: localStorage.getItem('dark') !== 'false' }),
  actions: {
    toggleDark() {
      const newDark = !this.dark;
      localStorage.setItem('dark', newDark.toString());
      document.documentElement.classList.toggle('dark');
      this.dark = newDark;
    },
  },
});
