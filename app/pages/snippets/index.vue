<template>
  <div class="ml-0 mt-2">
    <div class="flex justify-between align-center">
      <h1 class="text-h6 text-secondary font-semibold">{{ $t("snippets.title") }}</h1>
    </div>
    <h2 class="text-subtitle-1 text-grey">{{ $t("snippets.subtitle") }}</h2>
    <table v-if="snippets" class="min-w-full text-left text-sm font-light mb-10 md-block hidden">
      <thead class="border-b font-medium">
        <tr class="">
          <th>
            {{ $t("snippets.name") }}
          </th>
          <th>
            {{ $t("snippets.description") }}
          </th>
          <th class="md-w-24">
            {{ $t("snippets.category_uppercase") }}
          </th>
          <th>
            {{ $t("snippets.last_updated") }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="snippet in snippets" :key="snippet.name" class="border-b border-gray-700 h-16">
          <td>
            <NuxtLink :to="snippet.path" class="no-underline text-secondary font-bold">{{ snippet.title }}</NuxtLink>
          </td>
          <td>{{ snippet.description }}</td>
          <td>{{ snippet.category }}</td>
          <td>{{ dayjs(snippet.last_updated).format("MMMM D, YYYY") }}</td>
        </tr>
      </tbody>
    </table>
    <div v-for="snippet in snippets" :key="snippet.id" class="block md-hidden max-w-2xl py-4 my-4 bg-black rounded-lg shadow-custom border-2">
      <Card :item="snippet" />
    </div>
  </div>
</template>
<script setup>
import dayjs from "dayjs";
import useFetch from "../../composables/fetch";

const { t: $t } = useI18n();
const { fetchAll } = useFetch();
const snippets = ref(null);

snippets.value = await fetchAll("snippets");

if (import.meta.client) {
  useHead({
    title: $t("seo.snippets_title"),
    description: $t("snippets.subtitle"),
  });
}
</script>
