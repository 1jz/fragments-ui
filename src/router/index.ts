import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import ViewFragments from "@/views/ViewFragments.vue";
import AddFragments from "@/views/AddFragments.vue";

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
            path: "/fragments",
            name: "view_fragments",
            component: ViewFragments,
            meta: { requiresAuth: true },
        },
        {
            path: "/fragments/add",
            name: "add_fragments",
            component: AddFragments,
            meta: { requiresAuth: true },
        },
    ],
});

export default router;
