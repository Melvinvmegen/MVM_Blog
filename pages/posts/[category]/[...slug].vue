<template>
  <div>
    <Breadcrumbs />
    <div v-if="post">
      <h1
        class="flex text-3xl font-bold d-flex justify-space-between align-center mb-4"
      >
        {{ post.title }}
        <Icon
          v-if="canShare"
          name="mdi:share-outline"
          size="30"
          title="Share this article"
          class="ml-2"
          @click="
            shareLink({
              title: post.title,
              text: post.description,
              path: post._path,
            })
          "
        />
      </h1>
      <h3>{{ post.description }}</h3>
      <ContentRenderer :value="post" />
      <h3
        class="text-center font-italic p-4 text-medium-emphasis font-weight-regular"
      >
        {{ t("posts.last_updated") }} {{ post.last_updated }}
      </h3>
    </div>
    <PortfolioTeaser />
  </div>
</template>
<script setup>
import { useI18n } from "vue-i18n";
import useFetch from "../../../composables/fetch";

const { fetchOne } = useFetch();
const { t } = useI18n();
const { path } = useRoute();
const post = ref(null);
post.value = await fetchOne(path, { _path: path });

let canShare;
let shareLink;
if (process.client) {
  canShare = computed(() => "share" in navigator);
  shareLink = async (data) => {
    data.path = window.location.origin + data.path;
    if (!canShare.value) return;
    await navigator?.share(data);
  };
}


if (post.value && process.client) {
  useHead({
    title: post.value.title,
    description: post.value.subtitle,
  });
}
</script>
