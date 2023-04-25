<template>
  <div class="flex justify-center md:flex-row flex-col">
    <div class="w-full md:w-8/12" v-if="posts">
        <h2 class="text-h6 text-secondary font-semibold">{{ t("posts.last_content") }}</h2>
        <div
          class="max-w-2xl px-8 py-4 my-4 bg-black rounded-lg shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border-2"
          v-for="article in posts"
          :key="article.id"
        >
          <Card :item="article" />
        </div>
    </div>
    <div class="hidden md:block md:w-1/12">
    </div>
    <div class="w-full md:w-3/12">
      <div>
        <h2 class="text-h6 text-secondary font-semibold">{{ t("posts.categories") }}</h2>
        <div class="flex flex-wrap">
          <NuxtLink
            :to="`/posts/${category}`"
            v-for="category in categories"
            class="font-weight-bold text-white"
          >
            <div
              class="[word-wrap: break-word] rounded-xl p-3 my-[5px] mr-4 mb-2 flex h-[32px] cursor-pointer items-center justify-between bg-gray-800 hover:bg-gray-700 px-[12px] py-0 text-[13px] font-normal normal-case leading-loose text-[#ffffff] shadow-none transition-[opacity] duration-300 ease-linear hover:!shadow-none active:bg-gray-400"
            >
              {{ category }}
            </div>
          </NuxtLink>
        </div>
      </div>
      <div>
        <h2 class="text-h6 text-secondary mb-2 font-semibold">{{ t("posts.snippets") }}</h2>
        <div class="flex flex-col">
          <ul class="list-none mx-0">
            <li
              v-for="snippet in snippets"
              :key="snippet.title"
              link
              class="py-2"
            >
              <NuxtLink
                class="text-white font-semibold hover:underline"
                :to="snippet._path.substr(3, snippet._path.length)"
                >🚀 {{ snippet.title }}</NuxtLink
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useI18n } from "vue-i18n";
import useFetch from "../composables/fetch";

const { fetchAll } = useFetch();
const { t, locale } = useI18n();
const posts = ref(null);
const snippets = ref(null);
let categories = null;
async function fetchPosts(lang) {
  posts.value = await fetchAll(`postsList-${lang}`, `/${lang}/posts`);
}

async function fetchSnippets(lang) {
  snippets.value = await fetchAll(`snippetsList-${lang}`, `/${lang}/snippets`);
}

await fetchPosts(locale.value);
await fetchSnippets(locale.value);

watch(locale, async (newLocale) => {
  await fetchPosts(newLocale);
  await fetchSnippets(newLocale);
});

if (posts.value?.length > 0) {
  categories = computed(() => [
    ...new Set(posts.value.map((c) => c.category?.toLowerCase())),
  ]);
}
</script>
