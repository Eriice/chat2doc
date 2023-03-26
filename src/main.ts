import { createApp } from "vue";

import 加载样式 from "@/样式/加载样式";
import App from "./App.vue";

加载样式();
createApp(App).mount("#app");
