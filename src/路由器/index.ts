import type { App } from "vue";
import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHashHistory } from "vue-router";
// import { setupPageGuard } from './路由守卫'
import AppLayout from "@/布局/应用布局.vue";

const 路由配置: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Root",
    component: AppLayout,
    redirect: "/chat",
    children: [
      {
        path: "/chat/:uuid?",
        name: "Chat",
        component: () => import("@/页面/聊天/聊天.vue")
      }
    ]
  }
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes: 路由配置,
  scrollBehavior: () => ({ left: 0, top: 0 })
});

// setupPageGuard(router)

export const 启动路由器 = async (app: App) => {
  app.use(router);
  await router.isReady();
};
