import { defineStore } from 'pinia'

const systemStore = defineStore('system', {
  state: () => ({
    userEmail: '',
    firebaseData: {},
    showModalResetPassword: false,
    selectedExpertUid: null as string | null,
  }),
  actions: {
    setUserEmail(userEmail: string) {
      this.userEmail = userEmail
    },
    setFirebaseData(firebaseData: any) {
      this.firebaseData = firebaseData
    },
    setToggleShowModalResetPassword() {
      this.showModalResetPassword = !this.showModalResetPassword
    },
    setSelectedExpertUid(selectedExpertUid: string | null) {
      this.selectedExpertUid = selectedExpertUid
    },
  },
  getters: {
    getUserEmail: (state) => state.userEmail,
    getFirebaseData: (state) => state.firebaseData,
    getShowModalResetPassword: (state) => state.showModalResetPassword,
    getSelectedExpertUid: (state) => state.selectedExpertUid,
  },
  persist:true
})

export default systemStore
