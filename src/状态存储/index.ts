import type { App } from "vue";
import { createPinia } from "pinia";

export const 状态存储 = createPinia();

export const 启动状态存储 = (app: App) => {
  app.use(状态存储);
};

export * from "./模块";
