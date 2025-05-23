import { defineStore } from 'pinia'

const expertStore = defineStore('expert', {
  state: () => ({
    expertArea: '',
    expertName: '',
    expertUid: '',
    summary: '',
  }),
  actions: {
    setExpertArea(expertArea: string) {
      this.expertArea = expertArea
    },
    setExpertName(expertName: string) {
      this.expertName = expertName
    },
    setExpertUid(expertUid: string) {
      this.expertUid = expertUid
    },
    setSummary(summary: string) {
      this.summary = summary
    },
  },
  getters: {
    getExpertName: (state) => state.expertName,
    getExpertArea: (state) => state.expertArea,
    getExpertUid: (state) => state.expertUid,
    getSummary: (state) => state.summary,
  },
  persist: true,
})

export default expertStore
