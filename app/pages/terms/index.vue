<template>
  <div v-if="terms">
    <h1 class="text-3xl text-center">{{ terms.title }}</h1>
    <h3 class="text-center font-italic pa-4 font-weight-regular">
      {{ $t("posts.last_updated") }} {{ dayjs(terms.last_updated).format("MMMM D, YYYY") }}
    </h3>
    <br />
    <ContentRenderer :value="terms" />
  </div>
</template>
<script setup>
import dayjs from "dayjs";
import useFetch from "../../composables/fetch";

const { fetchOne } = useFetch();
const { path } = useRoute();
const terms = ref(null);

terms.value = await fetchOne("files", { field: "path", operator: "=", value: "/files" + path });

if (import.meta.client) {
  useHead({
    title: terms.value.title,
  });
}
</script>
