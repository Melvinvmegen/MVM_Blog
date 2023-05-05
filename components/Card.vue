<template>
  <div class="flex items-center justify-between">
    <span class="text-sm font-light">
      {{ item.last_updated }}</span
    >
    <NuxtLink
      :to="`/posts/${item.category?.toLowerCase()}`"
      class="px-3 py-1 text-sm font-bold text-black transition-colors duration-300 transform bg-secondary rounded cursor-pointer hover:bg-gray-500"
      >{{ item.category }}</NuxtLink
    >
  </div>

  <div class="mt-2">
    <NuxtLink
      :to="item._path"
      class="no-underline text-xl font-bold hover:underline"
      >{{ item.title }}</NuxtLink
    >
    <p class="mt-2">
      {{ item.description }}
    </p>
  </div>

  <div class="flex items-center justify-between mt-4">
    <NuxtLink
      :to="item._path"
      class="font-weight-bold text-secondary hover:text-third"
      >{{ t("posts.read_more") }}</NuxtLink
    >
  </div>
</template>
<script setup>
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n();

defineProps({
  item: {
    type: Object,
    required: true,
  },
});
</script>
