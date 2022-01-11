import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import styleImport, { VantResolve } from "vite-plugin-style-import"
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    styleImport({
      resolves: [VantResolve()],
    }),
  ],
  resolve: {
    alias: {
      src: path.resolve(__dirname, "src"),
      // "@": path.resolve(__dirname, "/src"),
    },
  },
})
