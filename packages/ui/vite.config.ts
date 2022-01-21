import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import styleImport, { VantResolve } from "vite-plugin-style-import"
import path from "path"
import libInjectCss from "./libInjectCss"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    styleImport({
      resolves: [VantResolve()],
    }),
    libInjectCss(),
  ],
  resolve: {
    alias: {
      src: path.resolve(__dirname, "src"),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/build.ts"),
      name: "KindMan",
      fileName: (format) => `kind-man.${format}.js`,
    },
    minify: false,
  },
})
