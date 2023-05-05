<template>
  <div>
    <Breadcrumbs />
    <div v-if="snippet">
      <h1 class="text-3xl d-flex justify-space-between align-center">
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
      <h3 class="mt-4">{{ snippet.description }}</h3>
      <br />
      <ContentRenderer :value="snippet" />
      <h3
        class="text-center font-italic py-4 text-medium-emphasis font-weight-regular"
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
const { t } = useI18n();
const { path } = useRoute();
const snippet = ref(null);
let canShare

snippet.value = await fetchOne(path, { _path: path });

if (process.client) {
  canShare = computed(() => "share" in navigator);
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
