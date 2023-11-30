<template>
  <div v-if="post">
    <Breadcrumbs :item="post" />
    <h1 class="flex text-3xl font-bold d-flex justify-space-between align-center mb-4">
      {{ post.title }}
      <Icon v-if="canShare" name="mdi:share-outline" size="30" title="Share this article" class="ml-2" @click="
        shareLink({
          title: post.title,
          text: post.description,
          path: post._path,
        })
        " />
    </h1>
    <NuxtImg v-if="post.cover" provider="cloudinary" :src="post.cover" class="my-4" sizes="90vw sm:70vw md:40vw" />
    <h3>{{ post.description }}</h3>
    <div v-if="linkedPosts">
      <hr class="mt-8 mb-6">
      <ul>
        <li v-for="(linkedPost, index) in linkedPosts">
          <h4 class="my-1 text-lg">
            <span v-if="post._path === linkedPost._path">{{ $t("posts.linkedArticlePart", [index + 1]) }} {{ linkedPost.title }}</span>
            <NuxtLink v-else
              :to="`${linkedPost._path}`"
              class="font-weight-bold text-secondary hover:text-third">
              {{ $t("posts.linkedArticlePart", [index + 1]) }} {{ linkedPost.title }}
            </NuxtLink>
          </h4>
        </li>
      </ul>
      <hr class="mt-6 mb-8">
    </div>
    <StaticContentRenderer :path="post._path" />
    <h3 class="text-center font-italic p-4 text-medium-emphasis font-weight-regular">
      {{ $t("posts.last_updated") }} {{ dayjs(post.last_updated).format('MMMM D, YYYY') }}
    </h3>
  </div>
  <PortfolioTeaser :redirect-url="redirectUrl" :back-url="backUrl" />
</template>
<script setup>
import dayjs from "dayjs";
import useFetch from "../../../composables/fetch";

const { fetchOne, fetchAll } = useFetch();
const { path } = useRoute();
const post = ref(null);
const linkedPosts = ref(null);
post.value = await fetchOne(path, { _path: path });

if (post.value?.linkedPosts) {
  linkedPosts.value = await fetchAll("postsList", "/posts", { id: { $in: post.value.linkedPosts } });
}
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
