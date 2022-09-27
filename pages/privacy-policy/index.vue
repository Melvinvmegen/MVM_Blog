<template>
  <div>
    <h1 class="text-center">{{ privacy.title }}</h1>
    <h3 class="text-center font-italic pa-4 font-weight-regular">{{ t("posts.last_updated") }} {{ privacy.last_updated }}</h3>
    <br/>
    <ContentDoc :path="`/${locale}${path}`" />
  </div>
</template>
<script setup>
import { useI18n } from 'vue-i18n'
import useFetch from "../../composables/fetch";

const { fetchOne } = useFetch();
const { t, locale } = useI18n()
const { path } = useRoute();
const privacy = ref(null);

async function fetchData(lang) {
  privacy.value = await fetchOne(`${path}-${lang}`, {_path: `/${lang}${path}` });
}

await fetchData(locale.value)

watch(locale, (newLocale) => fetchData(newLocale))

useMeta({
  title: privacy.value.title,
})
</script>