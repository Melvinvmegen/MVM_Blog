<template>
  <div>
    <div class="flex justify-between ml-0 mt-2 align-center">
      <h2 class="text-h6 text-secondary">{{ category.toUpperCase() }}</h2>
      <span class="text-subtitle-1"
        >{{ posts.length }} {{ t("posts.articles") }}</span
      >
    </div>
    <div
      class="max-w-full px-8 py-4 my-4 bg-black rounded-lg shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border-2 dark:bg-gray-800"
      v-for="article in posts"
      :key="article._path"
    >
      <Card :item="article" />
    </div>
  </div>
</template>
<script setup>
import { useI18n } from "vue-i18n";
import useFetch from "../../../composables/fetch";

const { fetchAll } = useFetch();
const { t, locale } = useI18n();
const posts = ref(null);
const { path } = useRoute();
const category =
  path.split("/")[2].charAt(0).toUpperCase() + path.split("/")[2].slice(1);

async function fetchData(lang) {
  posts.value = await fetchAll(
    `postsList-${lang}-${category}`,
    `/${lang}/posts`,
    { category }
  );
}

await fetchData(locale.value);

watch(locale, async (newLocale) => await fetchData(newLocale));

if (posts.value?.length > 0 && process.client) {
  useHead({
    title: category,
    description: posts.value.map((p) => p.subtitle).toString(),
  });
}
</script>
