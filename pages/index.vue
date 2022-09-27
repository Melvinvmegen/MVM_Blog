<template>
  <v-row>
    <v-col cols="12" lg="8" md="8" sm="8">
      <h2 class="text-h6 ml-4 text-third">{{ t("posts.last_content") }}</h2>
      <v-card color="transparent" class="my-3" v-for="article in posts" :key="article._path">
        <v-card-title>
          {{ article.title }}
        </v-card-title>
        <v-card-subtitle>{{ article.subtitle }}</v-card-subtitle>
        <v-card-text>
          <p>{{ article.description }}</p>
          <NuxtLink :to="article._path.substr(3, article._path.length)" class="font-weight-bold text-white">{{ t("posts.read_more") }}</NuxtLink>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" md="4">
      <div>
        <h2 class="text-h6 text-third">{{ t("posts.categories") }}</h2>
        <NuxtLink :to="`/posts/${category}`" v-for="category in categories" class="font-weight-bold text-white">
          <v-chip class="mr-2 mb-2">{{ category }}</v-chip>
        </NuxtLink>
      </div>
      <div>
        <h2 class="text-h6 text-third mb-2">{{ t("posts.snippets") }}</h2>
        <v-list
          dense
          rounded
          bg-color="transparent"
          color="white"
          class="d-md-flex flex-column d-none"
        >
          <v-list-item
            v-for="snippet in snippets"
            :key="snippet.title"
            link
            class="px-0"
          >
            <v-list-item-title>
              <NuxtLink
                :to="snippet._path.substr(3, snippet._path.length)"
                class="text-white text-decoration-none"
                >🚀 {{ snippet.title }}</NuxtLink
              >
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </div>
    </v-col>
  </v-row>
</template>
<script setup>
import { useI18n } from 'vue-i18n';
import useFetch from "../composables/fetch";

const { fetchAll } = useFetch();
const { t, locale } = useI18n();
const posts = ref(null);
const snippets = ref(null);

async function fetchData(lang) {
  const response = await fetchAll(`postsList-${lang}`, `/${lang}/posts`);
  if (response.length) posts.value = response;
  snippets.value = await fetchAll(`snippetsList-${lang}`, `/${lang}/snippets`);
}

await fetchData(locale.value)

watch(locale, (newLocale) => fetchData(newLocale))

const categories = computed(() => posts.value?.map((c) => c.category));
</script>