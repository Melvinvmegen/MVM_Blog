<template>
  <Breadcrumbs />
  <div v-if="snippet">
    <h1 class="flex text-3xl d-flex justify-space-between align-center">
      {{ snippet.title }}
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
    <h3 class="mt-4">{{ snippet.description }}</h3>
    <br />
    <ContentRenderer :value="snippet" />
    <h3
      class="text-center font-italic py-4 text-medium-emphasis font-weight-regular"
    >
      {{ $t("posts.last_updated") }} {{ dayjs(snippet.last_updated).format('MMMM D, YYYY') }}
    </h3>
  </div>
  <ClientOnly>
    <PortfolioTeaser :redirect-url="redirectUrl" :back-url="backUrl" />
  </ClientOnly>
</template>
<script setup>
import useFetch from "../../composables/fetch";

const { fetchOne } = useFetch();
const { path } = useRoute();
const snippet = ref(null);
snippet.value = await fetchOne(path, { _path: path });

let canShare;
let shareLink;
let redirectUrl = ref(null);
let backUrl = ref(null);
if (process.client) {
  canShare = computed(() => "share" in navigator);
  shareLink = async (data) => {
    data.path = window.location.origin + data.path;
    if (!canShare.value) return;
    await navigator?.share(data);
  };
  redirectUrl.value = `${window.location.origin}/thank-you`;
  backUrl.value = window.location.href;
}

if (snippet.value && process.client) {
  useHead({
    title: `${snippet.value.category} - ${snippet.value.title}`,
    description: snippet.value.description,
  });
}
</script>
