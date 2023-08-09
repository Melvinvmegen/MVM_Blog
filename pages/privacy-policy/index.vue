<template>
  <div v-if="privacy">
    <h1 class="text-3xl text-center">{{ privacy.title }}</h1>
    <h3 class="text-center font-italic pa-4 font-weight-regular">{{ $t("posts.last_updated") }} {{ privacy.last_updated }}</h3>
    <br/>
    <ContentRenderer :value="privacy" />
  </div>
</template>
<script setup>
import useFetch from "../../composables/fetch";

const { fetchOne } = useFetch();
const { path } = useRoute();
const privacy = ref(null);

privacy.value = await fetchOne(path, { _path: path });

if (process.client) {
  useHead({
    title: privacy.value.title,
  })
}
</script>