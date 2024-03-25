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
    path: "/tabelas",
    name: "Datatables",
    component: () => import("../views/Datatables.vue"),
    meta: {
      enableNav: true,
      translatedName: 'Tabelas'
    },
  },
  {
    path: "/alertas",
    name: "Alerts",
    component: () => import("../views/Alerts.vue"),
    meta: {
      enableNav: true,
      translatedName: 'Alertas'
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
    path: "/form-kit",
    name: "FormKit",
    component: () => import("../views/FormsKit.vue"),
    meta: {
      enableNav: true,
      translatedName: 'FormKit'
    },
  },
  // {
  //   path: '/:catchAll(.*)*',
  //   name: 'NotFound',
  //   component: () => import("../views/NotFound.vue"),
  //   meta: {
  //     enableNav: false,
  //     translatedName: 'Não encontrado'
  //   }
  // }
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
