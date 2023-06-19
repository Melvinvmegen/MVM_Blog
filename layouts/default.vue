<template>
  <div class="bg-primary text-white min-h-screen">
    <div class="d-flex flex-column">
      <navbar :drawer="drawer" @open-drawer="drawer = !drawer" />
      <div class="flex-auto">
        <div class="container mx-auto">
          <div class="flex justify-center">
            <div
              class="2xl:w-8/12 xl:w-9/12 lg:w-10/12 w-11/12 max-w-full lg:max-w-none md:max-w-none sm:max-w-none mb-16"
            >
              <slot />
            </div>
          </div>
        </div>
      </div>
      <custom-footer :post-categories="post_categories" />
      <div
        class="max-w-sm fixed left-20 bottom-10 mx-auto color-black border-0 block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700"
        v-if="!cookie || showCookie"
      >
        <div class="pt-6 px-6">
          <h5
            class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50"
          >
            {{ t("cookies.title") }}
          </h5>
          <p class="mb-4 text-base text-neutral-600 dark:text-neutral-200">
            {{ t("cookies.text") }}
            <br />
            <NuxtLink to="/privacy-policy" class="no-underline text-black">{{
              t("cookies.link")
            }}</NuxtLink>
          </p>
        </div>
        <button
          type="button"
          class="h-10 w-2/4 pa-0 ma-0 inline-block bg-primary px-6 py-2 font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          @click="cookiesStated(false)"
        >
          {{ t("cookies.refuse") }}
        </button>
        <button
          type="button"
          class="h-10 w-2/4 pa-0 ma-0 inline-block bg-secondary px-6 py-2 font-medium uppercase leading-normal text-primary shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          @click="cookiesStated(true)"
        >
          {{ t("cookies.accept") }}
        </button>
      </div>
      <button
        aria-label="cookieChoices"
        type="button"
        class="hidden md:block fixed left-20 bottom-10 mx-auto bg-white rounded-full px-4 py-3 font-medium uppercase leading-normal text-primary shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
        @click="showCookie = true"
        v-else
      >
        <Icon name="mdi:check" size="16" />
      </button>
    </div>
    <div
      class="bg-primary z-50 fixed top-0 left-0 h-screen w-3/5 flex flex-col justify-between max-w-xs transition-transform transform duration-1000 ease-in-out"
      :class="{ 'translate-x-full': !drawer, 'translate-x-0': drawer }"
      v-if="drawer"
    >
      <div class="flex flex-col justify-center mt-24">
        <ul class="list-none mx-4">
          <li v-for="item of nav_items" :key="item.name">
            <NuxtLink
              :to="item.link"
              @click="drawer = false"
              class="my-2 text-white hover:text-gray-200 font-semibold text-xl no-underline"
              >{{ item.name }}</NuxtLink
            >
            <h3
              v-if="item.name === 'Posts'"
              v-for="sub_item of post_categories"
              class="my-4 ml-4 text-gray-300"
            >
              <NuxtLink
                :to="sub_item.link"
                @click="drawer = false"
                class="my-2 text-white hover:text-gray-200"
                >{{ sub_item.name }}</NuxtLink
              >
            </h3>
          </li>
        </ul>
      </div>
      <div class="flex flex-col justify-center">
        <div class="m-4 mb-12">
          <h6
            class="text-secondary mb-4 flex justify-center items-center font-semibold uppercase md:justify-start"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="mr-3 h-4 w-4"
            >
              <path
                d="M12.378 1.602a.75.75 0 00-.756 0L3 6.632l9 5.25 9-5.25-8.622-5.03zM21.75 7.93l-9 5.25v9l8.628-5.032a.75.75 0 00.372-.648V7.93zM11.25 22.18v-9l-9-5.25v8.57a.75.75 0 00.372.648l8.628 5.033z"
              />
            </svg>
            MVM
          </h6>
          <SocialLinks />
        </div>
      </div>
    </div>
    <div
      class="backdrop-blur-sm z-50 fixed top-0 right-0 h-screen w-2/5 flex flex-col justify-between max-w-xs"
      v-if="drawer"
      @click="drawer = !drawer"
    ></div>
  </div>
</template>
<script setup>
import { useI18n } from "vue-i18n";
import { useState } from "vue-gtag-next";
import useFetch from "../composables/fetch";

// Enable cookies
const showCookie = ref(false);
const cookie = ref({});
if (process.client) {
  cookie.value =
    document.cookie.split(";").filter((i) => i.includes("analytics"))[0] ||
    null;
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
const { t } = useI18n();

const drawer = ref(false);

const { fetchAll } = useFetch();
const posts = ref(null);
const post_categories = ref([]);
posts.value = await fetchAll("postsList", "/posts");

if (posts.value?.length > 0) {
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

useHead({
  titleTemplate: (title) => (title ? `MVM Blog - ${title}` : t("seo.title")),
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  charset: "utf-8",
  htmlAttrs: {
    lang: "en-US",
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
.bg-footer {
  background: linear-gradient(0deg, #000000, #4b4533) !important;
  transition: #4b4533 350ms linear 0s, #000000 350ms linear 0s;
}

h2 {
  margin: 30px 0;
  font-size: 1.5rem;
  line-height: 2rem;
}

h3 {
  font-size: 1.25rem;
  line-height: 1.75rem;
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

ul {
  margin-left: 20px;
  list-style: circle;
  flex-wrap: wrap;
}

ol {
  margin-left: 20px;
  list-style: auto;
  margin-bottom: 10px;
}

td,
th {
  font-size: 15px !important;
}

a {
  color: white;
  text-decoration: underline;
}

.footer-height {
  height: 200px !important;
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
