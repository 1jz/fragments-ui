import { createApp } from "vue";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from "@/App.vue";
import router from "@/router";
import { Amplify } from "aws-amplify";
import amplify_conf from "@/assets/amplify-conf";
import { useAuthenticator } from "@aws-amplify/ui-vue";
import { globalUserStore } from "@/stores/userStore";
import { storeToRefs } from "pinia";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import { Hub } from "aws-amplify";

// Configure our Auth object to use our Cognito User Pool
Amplify.configure(amplify_conf);

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}
app.use(ElementPlus);
app.use(createPinia());
app.use(router);

const userStore = globalUserStore();
const { auth, loginModal } = storeToRefs(userStore);

Hub.listen("auth", async (data) => {
    console.log("auth", data);
    auth.value = useAuthenticator();
    switch (data.payload.event) {
        case "signIn":
            loginModal.value = false;
            router.push({ name: "home" });
            break;
        case "signOut":
            loginModal.value = false;
            router.push({ name: "home" });
            break;
    }
});

router.beforeResolve(async (to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (auth.value.authStatus !== "authenticated") {
            return next({
                path: "/login",
            });
        }
        return next();
    }
    return next();
});

app.mount("#app");
