<template>
  <div v-if="posts">
    <div class="flex justify-between ml-0 mt-2 align-center">
      <h2 class="text-h6 text-secondary font-semibold">{{ $t("posts.last_content") }}</h2>
      <span class="text-subtitle-1"
        >{{ posts.length }} {{ $t("posts.articles") }}</span
      >
    </div>
    <div
      class="max-w-full px-8 py-4 my-4 bg-black rounded-lg shadow-custom border-2"
      v-for="article in posts"
      :key="article.path"
    >
      <Card :item="article" />
    </div>
  </div>
</template>
<script setup>
import useFetch from "../../composables/fetch";

const { fetchAll } = useFetch();
const { t: $t } = useI18n();
const posts = ref(null);

posts.value = await fetchAll("posts");

if (import.meta.client) {
  useHead({
    title: $t("seo.last_content"),
  });
}
</script>
