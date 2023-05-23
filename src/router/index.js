import { createRouter, createWebHistory } from "vue-router";

import { useCarStore } from "../stores/CarStore";

const routes = [
  {
    name: "Home",
    path: "/",
    component: () => import("@/views/Home.vue"),
  },
  {
    name: "Login",
    path: "/login",
    component: () => import("@/views/Login.vue"),
  },
  {
    name: "Register",
    path: "/register",
    component: () => import("@/views/Register.vue"),
  },
  {
    name: "Details",
    path: "/details/:id",
    component: () => import("@/views/CarDetails.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(() => {
  const store = useCarStore();
  store.showNav = false;
});

export default router;
