<script setup lang="ts">
import { globalUserStore } from "@/stores/userStore";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { createFragment } from "@/api/api";
import { ref } from "vue";
import type { UploadInstance } from "element-plus";

const userStore = globalUserStore();
const { auth, loginModal } = storeToRefs(userStore);
const router = useRouter();

const input = ref("");
const uploadRef = ref<UploadInstance>();
const submitUpload = () => {
    uploadRef.value?.submit();
};
const input_type = ref("text/plain");
const input_options = [
    {
        value: "text/plain",
        label: "plain text",
    },
    {
        value: "text/markdown",
        label: "Markdown",
    },
    {
        value: "text/html",
        label: "HTML",
    },
    {
        value: "application/json",
        label: "JSON",
    },
    {
        value: "image",
        label: "Image",
        disabled: false,
    },
];

if (router.currentRoute.value.name === "login") {
    if (auth.value.authStatus === "unauthenticated") loginModal.value = true;
    else if (auth.value.authStatus === "authenticated") router.push({ name: "home" });
}
</script>

<template>
    <h1>Add Fragments</h1>
    <el-select v-model="input_type" placeholder="Select">
        <el-option
            v-for="item in input_options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
        />
    </el-select>
    <div v-if="input_type !== 'image'">
        <el-input v-model="input" :rows="5" type="textarea" placeholder="Please input" clearable />
        <el-button
            @click="createFragment(auth.user.signInUserSession.idToken.jwtToken, input, input_type)"
        >
            add fragment
        </el-button>
    </div>
    <div v-if="input_type === 'image'">
        <el-upload
            ref="uploadRef"
            class="upload-demo"
            action="http://localhost:8080/v1/fragments"
            :headers="{
                'Content-Type': 'image/gif',
                Authorization: `Bearer ${auth.user.signInUserSession.idToken.jwtToken}`,
            }"
            :limit="1"
            :auto-upload="false"
        >
            <template #trigger>
                <el-button type="primary">select file</el-button>
            </template>
            <el-button class="ml-3" type="success" @click="submitUpload">
                create fragment
            </el-button>
            <template #tip>
                <div class="el-upload__tip text-red">
                    limit 1 file, new file will cover the old file
                </div>
            </template>
        </el-upload>
    </div>
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
