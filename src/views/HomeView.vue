<script setup lang="ts">
import StdContainer from "@/components/StdContainer.vue";
import { globalUserStore } from "@/stores/userStore";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const userStore = globalUserStore();
const { auth, loginModal } = storeToRefs(userStore);
const router = useRouter();

if (router.currentRoute.value.name === "login") {
    if (auth.value.authStatus === "unauthenticated") loginModal.value = true;
    else if (auth.value.authStatus === "authenticated") router.push({ name: "home" });
}
</script>

<template>
    <StdContainer>
        <h1>Home</h1>
        <template v-if="auth?.authStatus === 'configuring'">
            <button @click="auth.signOut">Loading...</button>
        </template>
        <template v-if="auth?.authStatus === 'authenticated'">
            <h1>Hello {{ auth.user.username }}!</h1>
        </template>
    </StdContainer>
</template>

<style>
.el-loading-spinner > svg.circular > circle {
    stroke: var(--accent-color);
}

.entry {
    padding: 0.5em 0;
}

.entry-list {
    width: 100%;
    height: fit-content;
}

.entry-title {
    max-width: fit-content;
    padding-left: 20px;
    margin-left: 20px;
    border-left: 4px solid var(--accent-color);
}

.entry-title > h1 {
    color: var(--color-heading);
}
</style>
