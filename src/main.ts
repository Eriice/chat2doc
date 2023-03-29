import { createApp } from "vue";

import 加载样式 from "@/样式/加载样式";
import { 启动路由器 } from "@/路由器/index";
import { 启动状态存储 } from "@/状态存储/index";
import App from "./App.vue";

async function bootstrap() {
  const app = createApp(App);
  加载样式();

  启动状态存储(app);

  await 启动路由器(app);

  app.mount("#app");
}

bootstrap();
