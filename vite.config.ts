import { defineConfig } from "vite";
import { fileURLToPath } from "url";

import vue from "@vitejs/plugin-vue";

// 开启按需引入
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: [
        "vue",
        {
          "naive-ui": ["useDialog", "useMessage", "useNotification", "useLoadingBar"]
        }
      ]
    }),
    Components({
      resolvers: [NaiveUiResolver()]
    })
  ],
  base: "./",
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@组件": fileURLToPath(new URL("./src/组件", import.meta.url))
    }
  },
  server: {
    port: 5173,
    host: "0.0.0.0"
  }
});
