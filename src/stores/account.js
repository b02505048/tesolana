import { defineStore } from "pinia";

export const useCounterStore = defineStore("acc", {
  state: () => ({
    id: null,
    name: null,
  }),
  getters: {
    getId: (state) => state.id,
    getName: (state) => state.name,
    isLoggedIn: (state) => !!state.id,
  },
  actions: {
    set(pubKey) {
      this.id = pubKey;
      this.name = `${pubKey.substring(0, 5)}...${pubKey.slice(-3)}`;
    },
  },
});
