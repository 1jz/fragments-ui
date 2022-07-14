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
        <el-header>
            <el-menu mode="horizontal" @select="handleSelect" :ellipsis="false">
                <el-menu-item index="home">
                    <el-icon><HomeFilled /></el-icon>
                    <span>Home</span>
                </el-menu-item>
                <el-menu-item index="view_fragments">
                    <el-icon><Document /></el-icon>
                    <span>View Fragments</span>
                </el-menu-item>
                <el-menu-item index="add_fragments">
                    <el-icon><DocumentAdd /></el-icon>
                    <span>Add Fragments</span>
                </el-menu-item>
            </el-menu>
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

    <el-dialog v-model="loginModal" width="fit-content" title="Login" center>
        <Authenticator :sign-up-attributes="['email', 'name']" />
    </el-dialog>

    <div style="display: none"><Authenticator /></div>
</template>

<style>
@import "@/assets/base.css";

ul.el-menu {
    border: unset;
    width: fit-content;
    display: inline-block;
}

.toolbar {
    width: fit-content;
    display: inline-block;
}

header.el-header {
    justify-content: space-between;
    display: flex;
    align-items: center;
    border-bottom: solid 1px var(--el-menu-border-color);
}

.layout-container {
    max-width: 1280px;
    margin: auto;
    background-color: var(--el-bg-color-page);
}
</style>
