<template>
  <div class="flex justify-center md-flex-row flex-col">
    <div class="w-full md-w-8" v-if="posts">
        <h2 class="text-xl text-secondary font-semibold">{{ $t("posts.last_content") }}</h2>
        <div
          class="max-w-2xl px-8 py-4 my-4 bg-black rounded-lg shadow-custom border-2"
          v-for="article in posts"
          :key="article.id"
        >
          <Card :item="article" />
        </div>
    </div>
    <div class="hidden md-block md-w-1">
    </div>
    <div class="w-full md-w-3">
      <div>
        <h2 class="text-xl text-secondary font-semibold">{{ $t("posts.categories") }}</h2>
        <div class="flex flex-wrap">
          <NuxtLink
            :to="`/posts/${category}`"
            v-for="category in categories"
            class="font-weight-bold text-white no-underline"
          >
            <div
              class="category-chip"
            >
              {{ category }}
            </div>
          </NuxtLink>
        </div>
      </div>
      <div>
        <h2 class="text-xl text-secondary mb-2 font-semibold">{{ $t("posts.snippets") }}</h2>
        <div class="flex flex-col">
          <ul class="list-none mx-0">
            <li
              v-for="snippet in snippets"
              :key="snippet.title"
              link
              class="py-2"
            >
              <NuxtLink
                class="text-white no-underline font-semibold hover-underline"
                :to="snippet._path"
                >🚀 {{ snippet.title }}</NuxtLink
              >
            </li>
            <li
              v-if="snippets.length < count"
              link
              class="py-2"
            >
              <NuxtLink
                class="text-secondary font-semibold hover-underline"
                to="/snippets"
                >See more snippets</NuxtLink
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import useFetch from "../composables/fetch";

const { fetchAll } = useFetch();
const posts = ref(null);
const snippets = ref(null);
const count = ref(0);
let categories = null;

posts.value = await fetchAll("postsList", "/posts");
snippets.value = await fetchAll("snippetsList", "/snippets", {}, 10);
count.value = await queryContent("/snippets").where({draft: { $ne: true }}).count();

if (posts.value?.length > 0) {
  categories = computed(() => [
    ...new Set(posts.value.map((c) => c.category?.toLowerCase())),
  ]);
}
</script>
