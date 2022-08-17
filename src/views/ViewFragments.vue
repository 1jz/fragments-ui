<script setup lang="ts">
import { globalUserStore } from "@/stores/userStore";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { getUserFragments, updateFragment, getFragmentById } from "@/api/api";
import { ref } from "vue";
import type { UploadInstance } from "element-plus";

const userStore = globalUserStore();
const { auth, loginModal } = storeToRefs(userStore);
const router = useRouter();

const fragments = ref([] as Array<any>);
getUserFragments(auth.value.user.signInUserSession.idToken.jwtToken, true).then((data) => {
    fragments.value = data.fragments;
});

if (router.currentRoute.value.name === "login") {
    if (auth.value.authStatus === "unauthenticated") loginModal.value = true;
    else if (auth.value.authStatus === "authenticated") router.push({ name: "home" });
}
const dialogVisible = ref(false);
const fragmentViewed = ref();

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

const view_type = ref("text/plain");
const view_options = [
    {
        value: "text/plain",
        label: "plain text",
        disabled: false,
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
        value: "image/png",
        label: "PNG",
    },
    {
        value: "image/jpeg",
        label: "JPEG",
    },
    {
        value: "image/gif",
        label: "GIF",
    },
    {
        value: "image/webp",
        label: "WEBP",
    },
];

const EXTENSION_TYPE_LIST = {
    "text/plain": "txt",
    "text/markdown": "md",
    "text/html": "html",
    "application/json": "json",
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/webp": "webp",
    "image/gif": "gif",
} as Record<string, string>;

const inspectFragment = async (fragment: any) => {
    let utf8decoder = new TextDecoder();
    dialogVisible.value = !dialogVisible.value;
    fragmentViewed.value = fragment;
    input_type.value = fragment.type;
    view_type.value = fragment.type;
    let fragmentData = await getFragmentById(
        auth.value.user.signInUserSession.idToken.jwtToken,
        fragment.id
    );
    let data = await fragmentData?.arrayBuffer();
    input.value = utf8decoder.decode(data);
};

const changeViewOption = async (option: any) => {
    let utf8decoder = new TextDecoder();
    let fragmentData = await getFragmentById(
        auth.value.user.signInUserSession.idToken.jwtToken,
        fragmentViewed.value.id,
        EXTENSION_TYPE_LIST[option] as string
    );
    let data = await fragmentData?.arrayBuffer();
    input.value = utf8decoder.decode(data);
};
</script>

<template>
    <h1>View Fragments</h1>
    <br />
    <el-container style="justify-content: center">
        <el-container class="fragment-container">
            <el-card class="fragment-card" v-for="fragment in fragments" :key="fragment?.id">
                <template #header>
                    <div class="card-header">
                        <a href="javascript:;" @click="inspectFragment(fragment)">
                            <span>{{ fragment?.id }}</span>
                        </a>
                    </div>
                </template>
                <div>
                    <p>type: {{ fragment?.type }}</p>
                    <p>created: {{ fragment?.created }}</p>
                    <p>updated: {{ fragment?.updated }}</p>
                    <p>size: {{ fragment?.size }}</p>
                </div>
            </el-card>
        </el-container>
    </el-container>
    <el-dialog v-model="dialogVisible" title="Tips" width="30%">
        <p>View type</p>
        <el-select v-model="view_type" placeholder="Select" @change="changeViewOption">
            <el-option
                v-for="item in view_options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
            />
        </el-select>
        <p>Update type</p>
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
            <el-input
                v-model="input"
                :rows="5"
                type="textarea"
                placeholder="Please input"
                clearable
            />
            <el-button
                @click="
                    updateFragment(
                        auth.user.signInUserSession.idToken.jwtToken,
                        input,
                        input_type,
                        fragmentViewed?.id
                    )
                "
            >
                update fragment
            </el-button>
        </div>
        <div v-if="input_type === 'image'">
            <el-upload
                ref="uploadRef"
                class="upload-demo"
                action="http://localhost:8080/v1/fragments"
                :headers="{
                    'Content-Type': 'image/png',
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
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="dialogVisible = false">Confirm</el-button>
            </span>
        </template>
    </el-dialog>
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
