import VueGtag from "vue-gtag-next";
import { trackRouter } from "vue-gtag-next";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueGtag, {
    isEnabled: false,
    property: {
      id: "G-YGR8KDHSQH",
    },
    useDebugger: true
  });

  const router = useRouter();
  trackRouter(router);
});
