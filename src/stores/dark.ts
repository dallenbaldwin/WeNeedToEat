import { defineStore } from 'pinia';

export const useDarkStore = defineStore({
  id: 'dark',
  actions: {
    toggleDark() {
      const newDark = !this.dark;
      localStorage.setItem('dark', newDark.toString());
      document.documentElement.classList.toggle('dark');
      this.dark = newDark;
    },
  },
  getters: {},
  state: () => {
    const initial = localStorage.getItem('dark');
    console.log(initial);
    return {
      dark: initial === 'false' ? false : true,
    };
  },
});
