import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/ipapi": {
        target: "https://ipapi.co",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/ipapi/, ""),
      },
    },
  },
});
