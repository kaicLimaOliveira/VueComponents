import { defineStore } from 'pinia'

export const useDarkModeStore = defineStore({
  id: 'darkMode',
  state: () => ({
    isDarkModeOn: localStorage.getItem('isDarkModeOn') === 'true' || false
  }),
  actions: {
    toggleDarkMode() {
      this.isDarkModeOn = !this.isDarkModeOn
      localStorage.setItem('isDarkModeOn', this.isDarkModeOn.toString())
    }
  }
})