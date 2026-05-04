<template>
  <div v-if="posts">
    <div class="flex justify-between ml-0 mt-2 align-center">
      <h2 class="text-h6 text-secondary">{{ category.toUpperCase() }}</h2>
      <span class="text-subtitle-1">{{ posts.length }} {{ $t("posts.articles") }}</span>
    </div>
    <div v-for="article in posts" :key="article.path" class="max-w-full py-4 my-4 bg-black rounded-lg shadow-custom">
      <Card :item="article" />
    </div>
  </div>
</template>
<script setup>
import useFetch from "../../../composables/fetch";

const { fetchAll } = useFetch();
const posts = ref(null);
const { path } = useRoute();
const raw = decodeURIComponent(path.split("/")[2]);
const category = raw.charAt(0).toUpperCase() + raw.slice(1);

posts.value = await fetchAll("posts", { field: "category", operator: "=", value: category });

if (posts.value?.length > 0 && import.meta.client) {
  useHead({
    title: category,
    description: posts.value.map((p) => p.subtitle).toString(),
  });
}
</script>
