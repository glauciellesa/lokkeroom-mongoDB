// vite.config.ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  root: "./src/frontend",
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "/src/frontend"),
    },
  },
  define: {
    "process.env": {},
  },
});
