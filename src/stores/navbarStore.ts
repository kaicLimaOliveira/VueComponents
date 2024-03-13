import { defineStore } from "pinia";

export const useNavbarStore = defineStore('navbar', {
  state: () => {
    return {
      enableNavbar: false,
    }
  },
})