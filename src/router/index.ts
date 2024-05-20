import { useUserStore } from "@/stores";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      component: () => import("@/views/login/index.vue"),
    },
    {
      path: "/",
      component: () => import("@/views/layout/index.vue"),
      redirect: "/article/manage",
      children: [
        {
          path: "/article/manage",
          component: () => import("@/views/article/manage.vue"),
        },
        {
          path: "/article/channel",
          component: () => import("@/views/article/channel.vue"),
        },
        {
          path: "/user/avatar",
          component: () => import("@/views/user/avatar.vue"),
        },
        {
          path: "/user/password",
          component: () => import("@/views/user/password.vue"),
        },
        {
          path: "/user/profile",
          component: () => import("@/views/user/profile.vue"),
        },
      ],
    },
  ],
});

router.beforeEach((to) => {
  const useStore = useUserStore();
  if (!useStore.token && to.path !== "/login") return "/login";
});
export default router;
