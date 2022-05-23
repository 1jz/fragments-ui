<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import StdContainer from "../components/StdContainer.vue";

const route = useRoute();
const path = ref(route.path);
</script>

<template>
    <StdContainer class="center">
        <h1>{{ path }} does not exist.</h1>
    </StdContainer>
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
