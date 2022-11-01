<template>
  <v-app class="bg-primary">
    <v-layout class="d-flex flex-column">
      <v-app-bar color="primary" height="200" class="bg-header">
        <v-container class="h-100 mt-12 mt-md-16">
          <v-row justify="center">
            <v-col cols="10">
              <v-row>
                <v-menu offset-y="offset-y">
                  <template v-slot:activator="{}">
                    <v-row justify="center" align="center">
                      <v-app-bar-title>
                        <NuxtLink
                          to="/"
                          class="text-secondary text-decoration-none"
                          >MVM</NuxtLink
                        >
                      </v-app-bar-title>
                      <v-list
                        dense
                        rounded
                        bg-color="transparent"
                        color="white"
                        class="d-md-flex d-none"
                      >
                        <v-list-item
                          v-for="item in nav_items"
                          :key="item.name"
                          link
                          :to="item.link"
                        >
                          <v-list-item-title
                            class="text-white text-decoration-none"
                            >{{ item.name }}
                          </v-list-item-title>
                        </v-list-item>
                      </v-list>
                      <v-spacer></v-spacer>
                    </v-row>
                    <v-spacer></v-spacer>
                    <v-app-bar-nav-icon
                      class="d-flex d-md-none"
                      @click.stop="drawer = !drawer"
                    >
                      <Icon name="mdi:menu" size="24" />
                    </v-app-bar-nav-icon>
                    <div class="d-none d-md-flex">
                      <v-btn
                        icon
                        @click="toggleTheme"
                        color="white"
                        v-if="themeIsLight"
                      >
                        <Icon name="mdi:moon-waxing-crescent" size="24" />
                      </v-btn>
                      <v-btn icon @click="toggleTheme" color="white" v-else>
                        <Icon name="mdi:white-balance-sunny" size="24" />
                      </v-btn>
                      <v-btn
                        icon
                        @click="toggleSound"
                        color="white"
                        v-if="sound"
                      >
                        <Icon name="mdi:volume-medium" size="24" />
                      </v-btn>
                      <v-btn icon @click="toggleSound" color="white" v-else>
                        <Icon name="mdi:volume-off" size="24" />
                      </v-btn>
                    </div>
                    <v-menu width="100">
                      <template v-slot:activator="{ props }">
                        <v-btn
                          icon
                          v-bind="props"
                          class="mr-5"
                          :title="currentLanguage.name"
                        >
                          {{ currentLanguage.icon }}
                        </v-btn>
                      </template>
                      <v-list dense>
                        <v-list-item
                          v-for="language in languages"
                          v-bind:key="language.locale"
                          @click="setLanguage(language.locale)"
                          ripple
                          :title="language.name"
                        >
                          {{ language.icon }}
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </template>
                </v-menu>
              </v-row>
            </v-col>
          </v-row>
          <div class="custom-curve">
            <svg
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
                class="shape-fill"
              ></path>
            </svg>
          </div>
        </v-container>
      </v-app-bar>
      <v-main>
        <v-container fluid="fluid">
          <v-row justify="center">
            <v-col cols="11" lg="7" md="8" sm="10">
              <slot />
            </v-col>
          </v-row>
        </v-container>
      </v-main>
      <v-footer
        color="primary"
        bottom
        width="100%"
        class="bg-footer footer-height"
      >
        <v-row justify="center" class="h-100">
          <v-col cols="10" lg="7" md="8" sm="9">
            <v-row
              align="center"
              class="h-100 justify-center justify-md-space-between"
            >
              <v-col cols="10" lg="4" md="4" sm="5">
                <v-card
                  elevation="0"
                  rounded="0"
                  color="transparent"
                  width="100%"
                  height="100%"
                >
                  <v-row
                    no-gutters
                    class="flex-column h-100 align-start align-md-space-between"
                  >
                    <div>
                      <v-card-title
                        class="text-secondary text-center text-md-start"
                      >
                        MVM
                      </v-card-title>
                      <v-card-subtitle>
                        {{ t("footer.thanks") }}
                      </v-card-subtitle>
                    </div>
                    <v-card-text
                      class="d-md-flex d-none align-end text-caption"
                    >
                      © {{ new Date().getFullYear() }}
                      {{ t("footer.right_reserved") }}
                    </v-card-text>
                  </v-row>
                </v-card>
              </v-col>
              <v-col cols="10" lg="6" md="6" sm="7">
                <v-card
                  class="text-center"
                  elevation="0"
                  rounded="0"
                  color="transparent"
                  width="100%"
                >
                  <v-row justify="space-between">
                    <v-row class="flex-column">
                      <v-list
                        dense
                        rounded
                        bg-color="transparent"
                        color="white"
                      >
                        <v-list-item>
                          <v-list-item-title>
                            <v-card-subtitle class="text-subtitle-1">{{
                              t("footer.tutorials")
                            }}</v-card-subtitle>
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item
                          v-for="item in tutorials"
                          :key="item.name"
                          link
                          :to="item.link"
                        >
                          <v-list-item-title>
                            <v-list-item-title
                              class="text-white text-decoration-none"
                              >{{ item.name }}
                            </v-list-item-title>
                          </v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-row>
                    <v-row class="flex-column">
                      <v-list
                        dense
                        rounded
                        bg-color="transparent"
                        color="white"
                      >
                        <v-list-item>
                          <v-list-item-title>
                            <v-card-subtitle class="text-subtitle-1">{{
                              t("footer.links")
                            }}</v-card-subtitle>
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item
                          v-for="item in links"
                          :key="item.name"
                          link
                          :to="item.external ? undefined : item.link"
                          :href="item.external ? item.link : undefined"
                        >
                          <v-list-item-title>
                            <v-list-item-title
                              class="text-white text-decoration-none"
                            >
                              {{ item.name }}
                            </v-list-item-title>
                          </v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-row>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
          <v-card-text class="d-block d-md-none text-center text-caption"
            >© {{ new Date().getFullYear() }}
            {{ t("footer.right_reserved") }}</v-card-text
          >
        </v-row>
      </v-footer>
      <v-card
        max-width="344"
        variant="outlined"
        position="absolute"
        class="left-20 bottom-100 mx-auto bg-white color-black border-0"
        v-if="!cookie || showCookie"
      >
        <v-card-item>
          <v-card-title>
            {{ t("cookies.title") }}
          </v-card-title>
          <v-card-text class="px-0 pb-0 pt-4 text-caption text-grey">
            {{ t("cookies.text") }}
            <br />
            <NuxtLink
              to="/privacy-policy"
              class="text-decoration-none text-black"
              >{{ t("cookies.link") }}</NuxtLink
            >
          </v-card-text>
        </v-card-item>

        <v-card-actions class="pa-0 align-end">
          <v-btn
            variant="flat"
            :rounded="0"
            class="w-50 pa-0 ma-0"
            @click="cookiesStated(false)"
          >
            {{ t("cookies.refuse") }}
          </v-btn>
          <v-btn
            variant="flat"
            :rounded="0"
            class="bg-secondary w-50 pa-0 ma-0"
            color="primary"
            @click="cookiesStated(true)"
          >
            {{ t("cookies.accept") }}
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-btn
        color="black"
        icon
        position="absolute"
        class="left-20 bottom-100 mx-auto bg-white color-black border-0"
        @click="showCookie = true"
        v-else
      >
        <Icon name="mdi:check" size="24" />
      </v-btn>
    </v-layout>
    <v-navigation-drawer
      color="primary"
      v-model="drawer"
      absolute
      top
      fixed
      temporary
    >
      <div class="d-flex flex-column justify-space-between h-80">
        <v-list dense class="d-flex flex-column justify-center h-75">
          <v-list-item
            v-for="item of nav_items"
            :key="item.name"
            :to="item.link"
          >
            <h2 class="my-2">{{ item.name }}</h2>
            <h3
              class="my-4 ml-4"
              v-if="item.name === 'Posts'"
              v-for="sub_item of post_categories"
            >
              {{ sub_item.name }}
            </h3>
          </v-list-item>
        </v-list>
        <div class="d-flex d-md-none px-2">
          <v-btn
            icon
            @click="toggleTheme"
            color="transparent"
            v-if="themeIsLight"
          >
            <Icon name="mdi:moon-waxing-crescent" size="24" />
          </v-btn>
          <v-btn icon @click="toggleTheme" color="transparent" v-else>
            <Icon name="mdi:white-balance-sunny" size="24" />
          </v-btn>
          <v-btn icon @click="toggleSound" color="transparent" v-if="true">
            <Icon name="mdi:volume-medium" size="24" />
          </v-btn>
          <v-btn icon @click="toggleSound" color="transparent" v-else>
            <Icon name="mdi:volume-off" size="24" />
          </v-btn>
        </div>
      </div>
    </v-navigation-drawer>
  </v-app>
</template>
<script setup>
import { useTheme } from "vuetify";
import { useI18n } from "vue-i18n";
import { useState } from "vue-gtag-next";
import { getCookie } from "h3";
import useFetch from "../composables/fetch";

// Enable cookies
const showCookie = ref(false);
const cookie = ref(null);
if (process.client) {
  cookie.value = ref(
    document.cookie.split(";").filter((i) => i.includes("analytics"))[0] || null
  );
}
const { isEnabled } = useState();

function cookiesStated(boolean) {
  const state = `analytics={ state: ${boolean ? "accepted" : "refused"} }`;
  isEnabled.value = boolean;
  if (!cookie.value) {
    const analytics = useCookie("analytics", {
      expires: new Date(new Date().setFullYear(new Date().getFullYear() + 2)),
    });
    analytics.value = state;
  } else {
    document.cookie = state;
  }
  cookie.value = state;
  showCookie.value = false;
}

const route = useRoute();
const { t, locale } = useI18n();
const languages = [
  { locale: "en", name: "English", icon: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  { locale: "fr", name: "Français", icon: "🇫🇷" },
];
const currentLanguage = computed(() =>
  languages.find((l) => l.locale === locale.value)
);

function setLanguage(lang) {
  locale.value = lang;
}

const drawer = ref(false);

const { fetchAll } = useFetch();
const posts = ref(null);
const post_categories = ref([]);
async function fetchData(lang) {
  posts.value = await fetchAll(`postsList-${lang}`, `/${lang}/posts`);
}

await fetchData(locale.value);

watch(locale, async (newLocale) => await fetchData(newLocale));

if (posts.value.length > 0) {
  const categories = [...new Set(posts.value.map((c) => c.category))];
  post_categories.value = categories.map((c) => {
    return {
      name: c,
      link: `/posts/${c.toLowerCase()}`,
    };
  });
}

const nav_items = [
  { name: t("menu.posts"), link: "/posts" },
  { name: t("menu.snippets"), link: "/snippets" },
];

const links = [
  {
    name: t("footer.contact"),
    link: "mailto:melvin.vmegen@gmail.com",
    external: true,
  },
  { name: t("footer.terms"), link: "/terms" },
  { name: t("footer.privacy"), link: "/privacy-policy" },
];

const theme = useTheme();
const themeIsLight = computed(() => theme.global.name.value === "light");
function toggleTheme() {
  theme.global.name.value = themeIsLight.value ? "dark" : "light";
}

const sound = ref(false);
const beat = ref(null);
function toggleSound() {
  beat.value = beat.value || new Audio("../assets/sncf-signature.mp3");
  sound.value = !sound.value;
  if (!sound.value) {
    beat.value.pause();
    return;
  }
  beat.value.play();
}

useHead({
  titleTemplate: (title) => (title ? `MVM Blog - ${title}` : t("seo.title")),
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  charset: "utf-8",
  htmlAttrs: {
    lang: locale.value,
  },
  meta: [
    {
      name: "description",
      content: route.meta.description || t("seo.description"),
    },
    { name: "og:title", content: route.meta.title || t("seo.title") },
    {
      name: "og:description",
      content: route.meta.description || t("seo.description"),
    },
    { name: "og:image", content: "website" },
    { name: "og:image:alt", content: t("seo.image_alt") },
    { name: "og:image:width", content: "1280" },
    { name: "og:image:width", content: "675" },
  ],
});
</script>

<style>
.custom-curve {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
}

.custom-curve svg {
  position: relative;
  display: block;
  width: calc(100% + 1.3px);
  height: 60px;
}

.custom-curve .shape-fill {
  fill: #000000;
}

.bg-header {
  background: linear-gradient(0deg, #4b4533, #000000) !important;
  transition: #4b4533 350ms linear 0s, #000000 350ms linear 0s;
}

.bg-footer {
  background: linear-gradient(0deg, #000000, #4b4533) !important;
  transition: #4b4533 350ms linear 0s, #000000 350ms linear 0s;
}

.v-toolbar__content {
  align-items: flex-start !important;
}

h2 {
  margin: 30px 0;
}

h2 a {
  text-decoration: none !important;
  color: #f9d262;
}

h3 a {
  text-decoration: none !important;
  color: white;
}

p {
  margin: 20px 0;
}

pre {
  background-color: #2f2e2a;
  border-radius: 5px;
  padding: 20px;
  white-space: pre-wrap;
}

ul {
  margin-left: 20px;
  list-style: circle;
  flex-wrap: wrap;
}

ol {
  margin-left: 20px;
}

td,
th {
  font-size: 15px !important;
}

a {
  color: white;
}

.footer-height {
  height: 200px !important;
}

.v-navigation-drawer__scrim {
  opacity: 0.4 !important;
}

.pre-line {
  white-space: pre-line;
}

thead tr {
  border-bottom: solid;
}

table {
  border-collapse: collapse !important;
}

.left-20 {
  left: 20px;
}

.bottom-100 {
  bottom: 100px;
}

.h-80 {
  height: 80vh !important;
}

@media (max-width: 599px) {
  .footer-height {
    height: 400px !important;
  }
}
</style>
