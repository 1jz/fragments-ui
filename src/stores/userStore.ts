import { defineStore } from "pinia";
import { useAuthenticator } from "@aws-amplify/ui-vue";

export const globalUserStore = defineStore("globalUserStore", {
    // arrow function recommended for full type inference
    state: () => {
        return {
            auth: useAuthenticator(),
            loginModal: false,
        };
    },
});
