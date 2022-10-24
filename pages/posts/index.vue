<template>
  <v-row v-if="posts">
    <v-row justify="space-between" class="ml-0 mt-2 align-center">
      <h2 class="text-h6">{{ t("posts.last_content") }}</h2>
      <span class="text-subtitle-1">{{ posts.length }} {{ t("posts.articles") }}</span>
    </v-row>
    <v-card color="secondary" class="my-4 pa-4 rounded" v-for="article in posts" :key="article._path">
      <v-card-title class="pre-line">{{ article.title }}</v-card-title>
      <v-card-subtitle class="pre-line">{{ article.subtitle }}</v-card-subtitle>
      <v-card-text>
        <p>{{ article.description }}</p>
        <br/>
        <NuxtLink :to="article._path.substr(3, article._path.length)" class="font-weight-bold text-white">{{ t("posts.read_more") }}</NuxtLink>
      </v-card-text>
    </v-card>
  </v-row>
</template>
<script setup>
import { useI18n } from 'vue-i18n';
import useFetch from "../../composables/fetch";

const { fetchAll } = useFetch();
const { t, locale } = useI18n();
const posts = ref(null);

async function fetchData(lang) {
  posts.value = await fetchAll(`postsList-${lang}`, `/${lang}/posts`);
}

await fetchData(locale.value)

watch(locale, async (newLocale) => await fetchData(newLocale))

useMeta({
  title: t("seo.last_content"),
})
</script>