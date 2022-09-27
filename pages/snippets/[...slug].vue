<template>
  <div>
    <v-breadcrumbs class="px-0 mx-0" :items="breadcrumbs">
      <template v-slot:divider>
        <v-icon icon="mdi-chevron-right"></v-icon>
      </template>
      <template v-slot:title="{ item }">
        <NuxtLink :to="`/${item === 'Home' ? '' : item}`" class="text-white text-decoration-none">{{ item.charAt(0).toUpperCase() + item.slice(1) }}</NuxtLink>
      </template>
    </v-breadcrumbs>
    <h1 class="d-flex justify-space-between align-center">
      {{ snippet.title }}
      <v-icon icon="mdi-share-outline" size="x-small" v-if="canShare" title="Share this article" @click="shareLink({
          title: snippet.title,
          text: snippet.description,
          path: snippet._path,
      })">
      </v-icon>
    </h1>
    <h3>{{ snippet.description }}</h3>
    <br/>
    <ContentDoc :path="`/${locale}${path}`" />
    <h3 class="text-center font-italic pa-12 text-medium-emphasis font-weight-regular">{{ t("posts.last_updated") }} {{ snippet.last_updated }}</h3>
  </div>
</template>
<script setup>
import { useI18n } from 'vue-i18n'
import useFetch from "../../composables/fetch";

const { fetchOne } = useFetch();
const { t, locale } = useI18n();
const { path } = useRoute();
const snippet = ref(null);
const breadcrumbs = ref(null);

async function fetchData(lang) {
  snippet.value = await fetchOne(`${path}-${lang}`, {_path: `/${lang}${path}` });
}

await fetchData(locale.value)

watch(locale, (newLocale) => {
  fetchData(newLocale)
  breadcrumbs.value[0] = t("menu.home");
})

breadcrumbs.value = snippet.value._path.split('/').filter(s => s !== "fr" && s !== "en");
breadcrumbs.value[0] = t("menu.home");

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
  title: `${snippet.value.category} - ${snippet.value.title}`,
  description: snippet.value.description,
})
</script>