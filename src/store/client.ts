import { defineStore } from 'pinia'

const clientStore = defineStore('client', {
  state: () => ({
    clientName: '',
    clientUid: '',
  }),
  actions: {
    setClientName(clientName: string) {
      this.clientName = clientName
    },
    setClientUid(clientUid: string) {
      this.clientUid = clientUid
    },
  },
  getters: {
    getClientName: (state) => state.clientName,
    getClientUid: (state) => state.clientUid,
  },
})

export default clientStore
