import { defineStore } from 'pinia';

export const useEatInStore = defineStore({
  id: 'eatIn',
  state: () => ({ eatIn: localStorage.getItem('eatIn') === 'true' }),
  actions: {
    toggleEatIn() {
      const newEatIn = !this.eatIn;
      localStorage.setItem('eatIn', newEatIn.toString());
      this.eatIn = newEatIn;
    },
  },
});
