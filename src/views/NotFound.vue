<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const path = ref(route.path);
</script>

<template>
    <el-container class="center">
        <h1>{{ path }} does not exist.</h1>
    </el-container>
</template>

<style>
h1 {
    width: fit-content;
}

.center {
    justify-content: center;
    align-items: center;
}
</style>
