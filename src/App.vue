<script setup lang="ts">
import { ref } from "vue";
import "@aws-amplify/ui-vue/styles.css";
import { useRouter } from "vue-router";
import { globalUserStore } from "@/stores/userStore";
import { storeToRefs } from "pinia";
import { Auth } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-vue";

const userStore = globalUserStore();
const { auth, loginModal } = storeToRefs(userStore);

// ======= OTHER CONF =======

const route = useRouter();
const activeIndex = ref("");

const handleSelect = (key: string) => {
    if (key === "login") {
        route.push({ name: "login" });
        loginModal.value = true;
    } else if (key === "logout" && auth.value) {
        Auth.signOut();
        route.push({ name: "home" });
    } else {
        route.push({ name: key });
    }
    activeIndex.value = key;
};
</script>

<template>
    <el-container direction="horizontal" class="header">
        <div class="navbar-container">
            <el-menu
                :default-active="activeIndex"
                class="root-navbar"
                mode="horizontal"
                :ellipsis="false"
                background-color="var(--color-background-mute)"
                text-color="var(--color-heading)"
                active-text-color="var(--accent-color)"
                @select="handleSelect"
            >
                <el-menu-item index="home">Home</el-menu-item>
            </el-menu>
        </div>
        <template v-if="auth?.authStatus === 'authenticated'">
            <div>Logged in as {{ auth.user.username }}</div>
        </template>
        <div class="navbar-container">
            <el-menu
                class="root-navbar"
                mode="horizontal"
                :default-active="activeIndex"
                :ellipsis="false"
                background-color="var(--color-background-mute)"
                text-color="var(--color-heading)"
                active-text-color="var(--accent-color)"
                @select="handleSelect"
            >
                <template v-if="auth?.authStatus !== 'authenticated'">
                    <el-menu-item index="login">Login</el-menu-item>
                </template>
                <template v-if="auth?.authStatus === 'authenticated'">
                    <el-menu-item index="logout">Logout</el-menu-item>
                </template>
            </el-menu>
        </div>
    </el-container>
    <RouterView />

    <el-dialog v-model="loginModal" width="fit-content" title="Login" center>
        <Authenticator :sign-up-attributes="['email', 'name']" />
    </el-dialog>
    <div style="display: none"><Authenticator /></div>
</template>

<style>
@import "@/assets/base.css";

.root-navbar {
    border: unset;
}

.root-navbar > .el-menu-item {
    height: 2em;
    line-height: unset;
}

footer.el-footer {
    height: var(--footer-height);
    background-color: var(--color-background-mute);
}

.navbar-container > .el-menu {
    --el-menu-hover-bg-color: rgba(var(--accent-colors), 0.25) !important;
}

.header {
    justify-content: space-between;
    background-color: var(--color-background);
}
</style>
