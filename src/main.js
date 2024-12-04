import "./assets/style.css";

// * import toast with vue
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

// * import the vue app
import { createApp } from "vue";
import App from "./App.vue";

//* use the app
const app = createApp(App);
app.mount("#app");
app.use(Toast);
