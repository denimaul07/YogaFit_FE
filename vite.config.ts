import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";
import { fileURLToPath, URL } from "url";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  build: {
    commonjsOptions: {
      include: ["tailwind.config.js", "node_modules/**"],
    },
    minify: 'esbuild',
    target: "esnext"
  },
  optimizeDeps: {
    include: ["tailwind-config"],
  },
  plugins: [vue()],
  resolve: {
    alias: {
      "tailwind-config": path.resolve(__dirname, "./tailwind.config.js"),
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
})
