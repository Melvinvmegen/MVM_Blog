<template>
  <div>
    <h1 class="text-h6 text-third">{{ t("snippets.title") }}</h1>
    <h2 class="text-subtitle-1 text-grey">{{ t("snippets.subtitle") }}</h2>
    <v-table class="bg-transparent d-none d-sm-block" v-if="snippets">
      <thead>
        <tr class="">
          <th class="text-left">
            {{ t("snippets.name") }}
          </th>
          <th class="text-left">
            {{ t("snippets.description") }}
          </th>
          <th class="text-left">
            {{ t("snippets.category_uppercase") }}
          </th>
          <th class="text-left">
            {{ t("snippets.last_updated") }}
          </th>
        </tr>
      </thead>
      <v-divider/>
      <tbody>
          <tr
            v-for="snippet in snippets"
            :key="snippet.name"
          >
            <td><NuxtLink :to="snippet._path.substr(3, snippet._path.length)" class="text-decoration-none text-secondary">{{ snippet.title }}</NuxtLink></td>
            <td>{{ snippet.description }}</td>
            <td>{{ snippet.category }}</td>
            <td>{{ snippet.last_updated }}</td>
          </tr>
      </tbody>
    </v-table>
    <v-card :to="snippet._path.substr(3, snippet._path.length)" color="secondary" class="my-4 pa-4 rounded d-block d-sm-none" v-for="snippet in snippets" :key="snippet._path">
      <v-card-title class="px-2 pre-line">{{ snippet.title }}</v-card-title>
      <p class="mx-2">{{ snippet.description }}</p>
      <v-card color="accent" class="my-2 pa-2 rounded">
        <v-card-subtitle class="pre-line">
          <strong>{{ t("snippets.category") }}</strong> {{ snippet.category }}
        </v-card-subtitle>
        <v-card-subtitle class="pre-line">
          <strong>{{ t("posts.last_updated") }}</strong> {{ snippet.last_updated }}
        </v-card-subtitle>
      </v-card>
    </v-card>
  </div>
</template>
<script setup>
import { useI18n } from 'vue-i18n'
import useFetch from "../../composables/fetch";

const { fetchAll } = useFetch();
const { t, locale } = useI18n();
const snippets = ref(null);

async function fetchData(lang) {
  snippets.value = await fetchAll(`snippetsList-${lang}`, `/${lang}/snippets`);
}

await fetchData(locale.value)

watch(locale, (newLocale) => fetchData(newLocale))

useMeta({
  title: t("seo.snippets_title"),
  description: t("snippets.subtitle")
})
</script>