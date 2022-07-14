import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue({
            include: [/\.vue$/, /\.md$/],
            template: {
                compilerOptions: {
                    isCustomElement: (tag) => tag.startsWith("amplify-"),
                    sourceMap: true,
                },
            },
        }),
    ],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
            "./runtimeConfig": "./runtimeConfig.browser",
            find: "./runtimeConfig",
            replacement: "./runtimeConfig.browser",
        },
    },
    server: {
        watch: {
            usePolling: true,
        },
    },
});
