import { defineStore } from 'pinia'

const systemStore = defineStore('system', {
  state: () => ({
    userEmail: '',
    firebaseData: {},
    showModalResetPassword: false,
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
  },
  getters: {
    getUserEmail: (state) => state.userEmail,
    getFirebaseData: (state) => state.firebaseData,
    getShowModalResetPassword: (state) => state.showModalResetPassword,
  },
})

export default systemStore
