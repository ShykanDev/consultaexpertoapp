import { defineStore } from "pinia";

export const userStore = defineStore("user", {
    state: () => ({
        userExpertPick: null as string | null,    
    }),
    actions: {
        setUserExpertPick(userExpertPick: string) {
            this.userExpertPick = userExpertPick;
        }
    },
    getters: {
        getUserExpertPick : (state) => state.userExpertPick
    },
    persist:true
})
    