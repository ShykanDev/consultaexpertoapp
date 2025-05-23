import { defineStore } from 'pinia'

export const experts = defineStore('experts', {
  state: () => ({
    area: 'Data',
    expertType: '',
    expertName: '',
    proffession: '',
    title: '',
    availableTimeData: [],
    userDateSelection: '',
    userHourSelection: '',
    isLoading: false,
    expertUid: '',
  }),
  actions: {
    setExpertName(expertName: string) {
      this.expertName = expertName
    },
    setExpertUid(expertUid: string) {
      this.expertUid = expertUid
    },
    setExpertType(expertType: string) {
      this.expertType = expertType
    },
    setProffession(proffession: string) {
      this.proffession = proffession
    },
    setTitle(title: string) {
      this.title = title
    },
    setAvailableTimeData(availableTimeData: any) {
      this.availableTimeData = availableTimeData
    },
    setUserDateSelection(userDateSelection: string) {
      this.userDateSelection = userDateSelection
    },
    setUserHourSelection(userHourSelection: string) {
      this.userHourSelection = userHourSelection
    },
    setIsLoading(isLoading: boolean) {
      this.isLoading = isLoading
    },
    setArea(area: string) {
      this.area = area
    },
  },
  getters: {
    getExpertName: (state) => state.expertName,
    getExpertUid: (state) => state.expertUid,
    getExpertType: (state) => state.expertType,
    getProffession: (state) => state.proffession,
    getTitle: (state) => state.title,
    getAvailableTimeData: (state) => state.availableTimeData,
    getUserDateSelection: (state) => state.userDateSelection,
    getUserHourSelection: (state) => state.userHourSelection,
    getIsLoading: (state) => state.isLoading,
    getArea: (state) => state.area,
  },
})
