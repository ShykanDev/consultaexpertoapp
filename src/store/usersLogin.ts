import type { User } from 'firebase/auth'
import { defineStore } from 'pinia'

export const usersLogin = defineStore('usersLogin', {
  state: () => ({
    isClient: false,
    isExpert: false,
    expertsList: ['awscodeapp@gmail.com'],
  }),
  actions: {
    setIsClient(isClient: boolean) {
      this.isClient = isClient
    },
    setIsExpert(isExpert: boolean) {
      this.isExpert = isExpert
    },
    expertIncluded(email: string) {
      return this.expertsList.includes(email)
    },
  },
})
