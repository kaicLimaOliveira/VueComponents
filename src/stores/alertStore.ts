import { defineStore } from "pinia";

type Alert = {
  id?: string | number;
  type: string,
  title: string,
  content: string
}

interface State {
  alerts: Alert[];
}

export const useAlertStore = defineStore('alert', {
  state: (): State => {
    return {
      alerts: [],
    }
  },
  actions: {
    add(el: Alert) {
      el.id = Math.round(Math.random() * 100000).toString()
      this.alerts.unshift(el)

      setTimeout(() => {
        this.remove(el)
      }, 5000)
    },
    remove(el: Alert) {
      const i = this.alerts.indexOf(el)
      if (i > -1)
        this.alerts.splice(i, 1)
    },
  }
})
