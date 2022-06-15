<script setup lang="ts">
import { useRouter, RouterView } from "vue-router";
import { globalUserStore } from "@/stores/userStore";
import { storeToRefs } from "pinia";
import { Auth } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-vue";
import "@aws-amplify/ui-vue/styles.css";

const userStore = globalUserStore();
const { auth, loginModal } = storeToRefs(userStore);

// ======= OTHER CONF =======

const router = useRouter();
const handleSelect = (key: string) => {
    if (key === "login") {
        router.push({ name: "login" });
        loginModal.value = true;
    } else if (key === "logout" && auth.value) {
        Auth.signOut();
        router.push({ name: "home" });
    } else {
        router.push({ name: key });
    }
};
</script>

<template>
    <el-container class="layout-container" style="height: 100vh">
        <el-aside class="sidebar" width="200px">
            <el-scrollbar>
                <el-menu @select="handleSelect" :ellipsis="false">
                    <el-menu-item index="home">
                        <el-icon><HomeFilled /></el-icon>
                        <span>Home</span>
                    </el-menu-item>
                </el-menu>
            </el-scrollbar>
        </el-aside>

        <el-container>
            <el-header>
                <div class="toolbar">
                    <template v-if="auth.authStatus !== 'authenticated'">
                        <el-button type="success" plain @click="handleSelect('login')">
                            Login
                        </el-button>
                    </template>
                    <template v-if="auth.authStatus === 'authenticated'">
                        <el-dropdown split-button type="primary">
                            {{ auth.user.username }}
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item @click="handleSelect('logout')"
                                        >Logout</el-dropdown-item
                                    >
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </template>
                </div>
            </el-header>

            <el-main>
                <RouterView />
            </el-main>
        </el-container>
    </el-container>

    <el-dialog v-model="loginModal" width="fit-content" title="Login" center>
        <Authenticator :sign-up-attributes="['email', 'name']" />
    </el-dialog>

    <div style="display: none"><Authenticator /></div>
</template>

<style>
@import "@/assets/base.css";

.sidebar {
    border-right: solid 1px var(--el-menu-border-color);
}

ul.el-menu {
    border-right: unset;
}

header.el-header {
    flex-direction: column;
    justify-content: center;
    display: flex;
    align-items: end;
}

.layout-container {
    max-width: 1280px;
    margin: auto;
    background-color: var(--el-bg-color-page);
}
</style>
