<template>
  <div>
    <h1 class="text-center">{{ terms.title }}</h1>
    <h3 class="text-center font-italic pa-4 font-weight-regular">{{ t("posts.last_updated") }} {{ terms.last_updated }}</h3>
    <br/>
    <ContentRenderer :value="terms" />
  </div>
</template>
<script setup>
import { useI18n } from 'vue-i18n'
import useFetch from "../../composables/fetch";

const { fetchOne } = useFetch();
const { t, locale } = useI18n()
const { path } = useRoute();
const terms = ref(null);

async function fetchData(lang) {
  terms.value = await fetchOne(`${path}-${lang}`, {_path: `/${lang}${path}` });
}

await fetchData(locale.value)

watch(locale, async (newLocale) => await fetchData(newLocale))

useMeta({
  title: terms.value.title,
})
</script>