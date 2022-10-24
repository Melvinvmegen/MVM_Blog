<template>
  <div>
    <v-breadcrumbs class="px-0 mx-0" :items="breadcrumbs" v-if="breadcrumbs?.length">
      <template v-slot:divider>
        <Icon name="mdi:chevron-right" size="24" />
      </template>
      <template v-slot:title="{ item }">
        <NuxtLink
          :to="`/${item === 'Home' ? '' : item}`"
          class="text-white text-decoration-none"
          >{{ item.charAt(0).toUpperCase() + item.slice(1) }}</NuxtLink
        >
      </template>
    </v-breadcrumbs>
    <div v-if="snippet">
      <h1 class="d-flex justify-space-between align-center">
        {{ snippet.title }}
        <Icon
          name="mdi:share-outline"
          size="16"
          v-if="canShare"
          title="Share this article"
          @click="
            shareLink({
              title: snippet.title,
              text: snippet.description,
              path: snippet._path,
            })
          "
        />
      </h1>
      <h3>{{ snippet.description }}</h3>
      <br />
      <ContentRenderer :value="snippet" />
      <h3
        class="text-center font-italic pa-12 text-medium-emphasis font-weight-regular"
      >
        {{ t("posts.last_updated") }} {{ snippet.last_updated }}
      </h3>
    </div>
  </div>
</template>
<script setup>
import { useI18n } from "vue-i18n";
import useFetch from "../../composables/fetch";

const { fetchOne } = useFetch();
const { t, locale } = useI18n();
const { path } = useRoute();
const snippet = ref(null);
const breadcrumbs = ref([]);

async function fetchData(lang) {
  snippet.value = await fetchOne(`${path}-${lang}`, {
    _path: `/${lang}${path}`,
  });
}

await fetchData(locale.value);

watch(locale, async (newLocale) => {
  await fetchData(newLocale);
  breadcrumbs.value[0] = t("menu.home");
});

if (snippet.value) {
  breadcrumbs.value = snippet.value._path
    .split("/")
    .filter((s) => s !== "fr" && s !== "en");
  breadcrumbs.value[0] = t("menu.home");
}

if (process.client) {
  const canShare = computed(() => "share" in navigator);
}

const shareLink = async (data) => {
  data.path = window.location.origin + data.path;
  if (!canShare.value) return;
  try {
    await navigator.share(data);
  } catch (error) {
    console.error(error);
  }
};

if (snippet.value) {
  useMeta({
    title: `${snippet.value.category} - ${snippet.value.title}`,
    description: snippet.value.description,
  });
}
</script>
