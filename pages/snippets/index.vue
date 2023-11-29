<template>
  <div class=" ml-0 mt-2">
    <div class="flex justify-between align-center">
      <h1 class="text-h6 text-secondary font-semibold">{{ $t("snippets.title") }}</h1>
    </div>
    <h2 class="text-subtitle-1 text-grey">{{ $t("snippets.subtitle") }}</h2>
    <table
      class="min-w-full text-left text-sm font-light mb-10 md:block hidden"
      v-if="snippets"
    >
      <thead class="border-b font-medium">
        <tr class="">
          <th>
            {{ $t("snippets.name") }}
          </th>
          <th>
            {{ $t("snippets.description") }}
          </th>
          <th class="md:w-24">
            {{ $t("snippets.category_uppercase") }}
          </th>
          <th>
            {{ $t("snippets.last_updated") }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="snippet in snippets"
          :key="snippet.name"
          class="border-b border-gray-700 h-16"
        >
          <td>
            <NuxtLink
              :to="snippet._path"
              class="no-underline text-secondary font-bold"
              >{{ snippet.title }}</NuxtLink
            >
          </td>
          <td>{{ snippet.description }}</td>
          <td>{{ snippet.category }}</td>
          <td>{{ dayjs(snippet.last_updated).format('MMMM D, YYYY') }}</td>
        </tr>
      </tbody>
    </table>
    <div
      class="block md:hidden max-w-2xl px-8 py-4 my-4 bg-black rounded-lg shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border-2"
      v-for="snippet in snippets"
      :key="snippet.id"
    >
      <Card :item="snippet" />
    </div>
  </div>
</template>
<script setup>
import dayjs from 'dayjs';
import useFetch from "../../composables/fetch";

const { t: $t } = useI18n();
const { fetchAll } = useFetch();
const snippets = ref(null);

snippets.value = await fetchAll("snippetsList", "/snippets");

if (process.client) {
  useHead({
    title: $t("seo.snippets_title"),
    description: $t("snippets.subtitle"),
  });
}
</script>
