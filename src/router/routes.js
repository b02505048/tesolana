const routes = [
  {
    path: "/",
    component: () => import("src/layouts/MainLayout.vue"),
    children: [
      {
        name: "index",
        path: "",
        component: () => import("src/pages/IndexPage.vue"),
      },
      {
        name: "map",
        path: "map",
        component: () => import("src/pages/MapPage.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
