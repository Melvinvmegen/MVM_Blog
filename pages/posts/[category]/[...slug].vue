<template>
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
    <NuxtImg v-if="post.cover" provider="cloudinary" :src="post.cover" class="my-4" sizes="90vw sm:70vw md:40vw"/>
    <h3>{{ post.description }}</h3>
    <ContentRenderer :value="post" />
    <h3
      class="text-center font-italic p-4 text-medium-emphasis font-weight-regular"
    >
      {{ $t("posts.last_updated") }} {{ dayjs(post.last_updated).format('MMMM D, YYYY') }}
    </h3>
  </div>
  <ClientOnly>
    <PortfolioTeaser :redirect-url="redirectUrl" :back-url="backUrl" />
  </ClientOnly>
</template>
<script setup>
import dayjs from "dayjs";
import useFetch from "../../../composables/fetch";

const { fetchOne } = useFetch();
const { path } = useRoute();
const post = ref(null);
post.value = await fetchOne(path, { _path: path });

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

if (post.value && process.client) {
  useHead({
    title: post.value.title,
    description: post.value.subtitle,
  });
}
</script>
