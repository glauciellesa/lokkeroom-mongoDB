import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Message from "../views/Message.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/message",
    name: "Message",
    component: Message,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
