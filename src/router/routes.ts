import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    enableNav: boolean;
    translatedName: string;
  }
}



const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
    meta: {
      enableNav: true,
      translatedName: 'Home',
    },
  },
  {
    path: "/loaders",
    name: "Loader",
    component: () => import("../views/Loaders.vue"),
    meta: {
      enableNav: true,
      translatedName: 'Loaders'
    },
  },
  {
    path: '/:catchAll(.*)*',
    name: 'NotFound',
    component: () => import("../views/NotFound.vue"),
    meta: {
      enableNav: false,
      translatedName: 'Não encontrado'
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from) => {
  if (to.name === from.name) return
  document.title = to.meta.translatedName
})


export default router;
