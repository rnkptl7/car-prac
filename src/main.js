import { createApp } from "vue";
import App from "./App.vue";
import VeeValidatePlugin from "./includes/validation";
import router from "./router";

import ToastPlugin from "vue-toast-notification";
import "vue-toast-notification/dist/theme-bootstrap.css";

import "./assets/main.scss";

const app = createApp(App);
app.use(router);
app.use(VeeValidatePlugin);
app.use(ToastPlugin);
app.mount("#app");
