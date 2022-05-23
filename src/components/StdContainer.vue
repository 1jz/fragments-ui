<script setup lang="ts"></script>

<template>
    <el-main class="content-area">
        <slot></slot>
    </el-main>
</template>

<style>
.content-area {
    display: flex;
    flex-direction: column;
    margin: auto;
    max-width: var(--std-container-size);
    background-color: var(--color-background);
    min-height: calc(100vh - var(--nav-height));
}

@media only screen and (max-width: 1280px) {
    .content-area {
        min-width: 100%;
    }
}
</style>
