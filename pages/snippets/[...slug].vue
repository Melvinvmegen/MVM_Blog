<template>
  <div>
    <Breadcrumbs :breadcrumbs="breadcrumbs" />
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
    <PortfolioTeaser />
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

  try {
    breadcrumbs.value = window.location.pathname
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
  } catch (error) {
    console.log(error);
  }
}

await fetchData(locale.value);

watch(locale, async (newLocale) => {
  await fetchData(newLocale);
  breadcrumbs.value[0] = { path: "", title: t("menu.home") };
});

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

if (snippet.value && process.client) {
  useHead({
    title: `${snippet.value.category} - ${snippet.value.title}`,
    description: snippet.value.description,
  });
}
</script>
