<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const breadcrumbs = ref([]);
if (process.client) {
  breadcrumbs.value = window?.location?.pathname
    ?.split("/")
    ?.filter((s) => s !== "fr" && s !== "en" && s)
    ?.reduce(
      (acc, b) => {
        acc.push({
          path: `${acc[acc.length - 1].path}/${b}`,
          title: b.charAt(0).toUpperCase() + b.slice(1),
        });
        return acc;
      },
      [{ path: "", title: t("menu.home") }]
    );
}
</script>
<template>
  <nav class="bg-grey-light w-full rounded-md" v-if="breadcrumbs?.length">
    <ol class="list-reset flex flex-wrap mx-0 py-6 items-center list-none">
      <template v-for="(item, index) of breadcrumbs">
        <li> 
          <NuxtLink
            :to="`${item === 'Home' ? '/' : item.path}`"
            class="text-white no-underline hover:text-secondary focus:text-secondary active:text-secondary"
            active-class="text-gray-900"
            >{{ item.title.charAt(0).toUpperCase() + item.title.slice(1) }}</NuxtLink
          >
        </li>
        <li v-if="index + 1 !== breadcrumbs.length">
          <span class="mx-2 text-white"
            ><Icon name="mdi:chevron-right" size="24"
          /></span>
        </li>
      </template>
    </ol>
  </nav>
</template>
