import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    enableNav: boolean;
    translatedName: string;
    icon?: string | string[];
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
    path: "/paginacoes",
    name: "Paginations",
    component: () => import("../views/Paginations.vue"),
    meta: {
      enableNav: true,
      translatedName: 'Paginations',
      icon: 'pager',
  },
  },
  {
    path: "/tabelas",
    name: "Datatables",
    component: () => import("../views/Datatables.vue"),
    meta: {
      enableNav: true,
      translatedName: 'Datatables',
      icon: 'table-list',
    },
  },
  {
    path: "/alertas",
    name: "Alerts",
    component: () => import("../views/Alerts.vue"),
    meta: {
      enableNav: true,
      translatedName: 'Alerts',
      icon: 'circle-exclamation',
    },
  },
  {
    path: "/loaders",
    name: "Loader",
    component: () => import("../views/Loaders.vue"),
    meta: {
      enableNav: true,
      translatedName: 'Loaders',
      icon: 'spinner',
    },
  },
  {
    path: "/modais",
    name: "Modals",
    component: () => import("../views/Modals.vue"),
    meta: {
      enableNav: true,
      translatedName: 'Modals',
      icon: 'window-restore',
    },
  },
  {
    path: "/forms",
    name: "Forms",
    children: [
      {
        path: "form-kit",
        name: "FormKit",
        component: () => import("../views/FormsKit.vue"),
        meta: {
          enableNav: true,
          translatedName: 'FormKit',
          icon: ['fab', 'wpforms'],
        },
      },
      {
        path: "debounce-input",
        name: "Debounce",
        component: () => import("../views/DebounceInput.vue"),
        meta: {
          enableNav: true,
          translatedName: 'DebounceInput',
          icon: 'magnifying-glass',
        },
      },
      {
        path: "select",
        name: "Select",
        component: () => import("../views/Selects.vue"),
        meta: {
          enableNav: true,
          translatedName: 'Selects',
          icon: 'arrow-pointer',
        },
      },
      {
        path: "multiple-select",
        name: "MultiSelect",
        component: () => import("../views/MultipleSelects.vue"),
        meta: {
          enableNav: true,
          translatedName: 'MultipleSelects',
          icon: 'object-ungroup',
        },
      },
    ],
    meta: {
      enableNav: true,
      translatedName: "Forms",
      icon: "file-signature"
    },
  },
  {
    path: "/elementos",
    name: "Elements",
    children: [
      {
        path: "dropdown",
        name: "Dropdown",
        component: () => import("../views/Dropdown.vue"),
        meta: {
          enableNav: true,
          translatedName: 'Dropdown',
          icon: ['fab', 'dropbox'],
        },
      },  
    ],
    meta: {
      enableNav: true,
      translatedName: "Forms",
      icon: ['fab', 'elementor']
    },
  },
  {
    path: '/',
    name: 'Fake',
    redirect: "#"
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
