import VueGtag, { trackRouter } from 'vue-gtag-next'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueGtag, {
    property: {
      id: "G-YGR8KDHSQH",
      params : {
        send_page_view : true,
      }
    },
  });

  trackRouter(useRouter());
});
