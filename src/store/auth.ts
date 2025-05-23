import { defineStore } from "pinia";

export const authStore = defineStore('auth', {
    state: () => ({
        isAuth: false,
        userName: null as string | null,
        userUid: null as string | null,
    }),
    actions: {
        setUserName(userName: string) {
            this.userName = userName;
        },
        setUserUid(userUid: string) {
            this.userUid = userUid;
        },
        setIsAuth(isAuth: boolean) {
            this.isAuth = isAuth;
        }
    },
    getters: {
        getUserName: (state) => state.userName,
        getUserUid: (state) => state.userUid,
        getIsAuth: (state) => state.isAuth,
    }
})