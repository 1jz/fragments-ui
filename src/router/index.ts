import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/:pathMatch(.*)*",
            name: "NotFound",
            component: () => import("@/views/NotFound.vue"),
        },
        {
            path: "/",
            name: "home",
            component: HomeView,
        },
        {
            path: "/login",
            name: "login",
            component: HomeView,
        },
        {
            path: "/asdf",
            name: "asdf",
            component: import("@/views/NotFound.vue"),
            meta: { requiresAuth: true },
        },
    ],
});

export default router;
