import { defineNuxtPlugin } from "#app";
import * as pkg from "vue-toastification"; //workaround https://github.com/Maronato/vue-toastification/issues/327
import "vue-toastification/dist/index.css"; // if needed

const { Toast } = pkg;

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Toast);
});
