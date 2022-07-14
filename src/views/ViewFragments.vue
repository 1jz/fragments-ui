<script setup lang="ts">
import { globalUserStore } from "@/stores/userStore";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { getUserFragments } from "@/api/api";
import { ref } from "vue";

const userStore = globalUserStore();
const { auth, loginModal } = storeToRefs(userStore);
const router = useRouter();

const fragments = ref([]);
getUserFragments(auth.value.user.signInUserSession.idToken.jwtToken, true).then((data) => {
    fragments.value = data.fragments;
});

if (router.currentRoute.value.name === "login") {
    if (auth.value.authStatus === "unauthenticated") loginModal.value = true;
    else if (auth.value.authStatus === "authenticated") router.push({ name: "home" });
}
</script>

<template>
    <h1>View Fragments</h1>
    <br />
    <el-container style="justify-content: center">
        <el-container class="fragment-container">
            <el-card class="fragment-card" v-for="fragment in fragments" :key="fragment.id">
                <template #header>
                    <div class="card-header">
                        <span>{{ fragment.id }}</span>
                    </div>
                </template>
                <div>
                    <p>type: {{ fragment.type }}</p>
                    <p>created: {{ fragment.created }}</p>
                    <p>updated: {{ fragment.updated }}</p>
                    <p>size: {{ fragment.size }}</p>
                </div>
            </el-card>
        </el-container>
    </el-container>
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

.fragment-card {
    min-width: 300px;
    margin: 2px;
}

.fragment-container {
    flex-wrap: wrap;
}
</style>
