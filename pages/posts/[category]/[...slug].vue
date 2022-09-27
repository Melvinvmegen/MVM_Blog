<template>
  <div>
    <v-breadcrumbs class="px-0 mx-0" :items="breadcrumbs">
      <template v-slot:divider>
        <v-icon icon="mdi-chevron-right"></v-icon>
      </template>
      <template v-slot:title="{ item }">
        <NuxtLink :to="`${item.path}`" class="text-white text-decoration-none">{{ item.title }}</NuxtLink>
      </template>
    </v-breadcrumbs>
    <h1 class="d-flex justify-space-between align-center">
      {{ post.title }}
      <v-icon icon="mdi-share-outline" size="x-small" v-if="canShare" title="Share this article" @click="shareLink({
          title: post.title,
          text: post.description,
          path: post._path,
      })">
      </v-icon>
    </h1>
    <h3>{{ post.description }}</h3>
    <br/>
    <ContentDoc :path="`/${locale}${path}`" />
    <h3 class="text-center font-italic pa-12 text-medium-emphasis font-weight-regular">{{ t("posts.last_updated") }} {{ post.last_updated }}</h3>
  </div>
</template>
<script setup>
import { useI18n } from 'vue-i18n';
import useFetch from "../../../composables/fetch";

const { fetchOne } = useFetch();
const { t, locale } = useI18n();
const { path } = useRoute();
const post = ref(null);
const breadcrumbs = ref(null);

async function fetchData(lang) {
  post.value = await fetchOne(`${path}-${lang}`, {_path: `/${lang}${path}` });
}

await fetchData(locale.value)

watch(locale, (newLocale) => {
  fetchData(newLocale)
  breadcrumbs.value[0] = {path: "", title: t("menu.home")};
})

breadcrumbs.value = post.value._path.split('/').filter(s => s !== "fr" && s !== "en" && s).reduce((acc, b) => {
  const path = acc[acc.length- 1].path
  acc.push({path: `${acc[acc.length- 1].path}/${b}`, title: b.charAt(0).toUpperCase() + b.slice(1)})
  return acc
}, [{path: "", title: t("menu.home")}]);

const canShare = computed(() => "share" in navigator);

const shareLink = async (data) => {
  data.path = window.location.origin + data.path;
  if (!canShare.value) return; 
  try {
    await navigator.share(data);
  } catch (error) {
    console.error(error);
  }
};

useMeta({
  title: post.value.title,
  description: post.value.subtitle,
})
</script>