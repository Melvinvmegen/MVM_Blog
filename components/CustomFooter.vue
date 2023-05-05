<template>
  <footer
    class="bg-footer text-center text-white dark:bg-white dark:text-neutral-200 lg:text-left"
  >
    <div class="container mx-auto py-10 text-center md:text-left">
      <div class="grid-1 grid gap-8 md:grid-cols-3 lg:grid-cols-3">
        <div class="">
          <h2
            class="text-secondary mb-4 flex items-center justify-center font-semibold uppercase md:justify-start"
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
          </h2>
          <p>
            {{ t("footer.thanks") }}
          </p>
          <SocialLinks />
        </div>
        <div class="flex flex-col items-center">
          <h6
            class="mb-2 flex justify-center md:justify-start font-semibold uppercase"
          >
            {{ t("footer.tutorials") }}
          </h6>
          <p
            class="my-2"
            v-for="item in postCategories"
            :key="item.name"
            link
            :to="item.link"
          >
            <NuxtLink
              :to="item.link"
              class="text-white hover:text-secondary no-underline"
              active-class="text-secondary"
              >{{ item.name }}</NuxtLink
            >
          </p>
        </div>
        <div class="flex flex-col items-center">
          <h6
            class="mb-2 flex justify-center font-semibold uppercase md:justify-start"
          >
            {{ t("footer.links") }}
          </h6>
          <p
            class="my-2"
            v-for="item in links"
            :key="item.name"
            link
            :to="item.link"
          >
            <NuxtLink
              :to="item.link"
              class="text-white hover:text-secondary no-underline"
              active-class="text-secondary"
              >{{ item.name }}</NuxtLink
            >
          </p>
        </div>
      </div>
      <div class="pt-8 text-center">
        <span>© 2023 Melvin van Megen. All Rights Reserved.</span>
      </div>
    </div>
  </footer>
</template>
<script setup lang="ts">
import { useI18n } from "vue-i18n";
const { t } = useI18n();
defineProps<{
  postCategories: {
    name: string;
    link: string;
  }[];
}>();

const links = [
  {
    name: t("footer.contact"),
    link: "mailto:melvin.vmegen@gmail.com",
    external: true,
  },
  {
    name: t("footer.portfolio"),
    link: "https://melvinvmegen.com/",
    external: true,
  },
  { name: t("footer.terms"), link: "/terms" },
  { name: t("footer.privacy"), link: "/privacy-policy" },
];
</script>
