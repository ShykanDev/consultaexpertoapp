import { defineStore } from "pinia";

export const authStore = defineStore('auth', {
    state: () => ({
        isAuth: false,
        userName: null as string | null,
        userUid: null as string | null,
        userEmail: null as string | null,
        isClient: false,
        isExpert: false,
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
        },
        setUserEmail(userEmail: string) {
            this.userEmail = userEmail;
        },
        setIsClient(isClient: boolean) {
            this.isClient = isClient;
        },
        setIsExpert(isExpert: boolean) {
            this.isExpert = isExpert;
        },
        setLogout() {
            this.isAuth = false;
            this.userName = null;
            this.userUid = null;
            this.userEmail = null;
            this.isClient = false;
            this.isExpert = false;
        }
    },
    getters: {
        getUserName: (state) => state.userName,
        getUserUid: (state) => state.userUid,
        getIsAuth: (state) => state.isAuth,
        getUserEmail: (state) => state.userEmail,
        getIsClient: (state) => state.isClient,
        getIsExpert: (state) => state.isExpert,
    },
    persist:true
})