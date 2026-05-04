<template>
  <nav v-if="breadcrumbs?.length" aria-label="breadcrumb">
    <ol class="breadcrumb">
      <template v-for="(breadcrumb, index) of breadcrumbs" :key="index">
        <li class="breadcrumb-item">
          <NuxtLink :to="breadcrumb.path || '/'" class="no-underline hover-text-secondary">
            {{ breadcrumb.title }}
          </NuxtLink>
          <Icon v-if="index + 1 !== breadcrumbs.length" name="mdi:chevron-right" size="18" class="breadcrumb-sep" />
        </li>
      </template>
    </ol>
  </nav>
</template>
<script setup>
const { t: $t } = useI18n();
const breadcrumbs = ref([]);
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

breadcrumbs.value = props.item?.path
  ?.split("/")
  ?.filter((s) => s !== "en" && s)
  ?.reduce(
    (acc, b) => {
      acc.push({
        path: `${acc[acc.length - 1].path}/${b}`,
        title: b.charAt(0).toUpperCase() + b.slice(1),
      });
      return acc;
    },
    [{ path: "", title: $t("menu.home") }]
  );
</script>

<style scoped>
.breadcrumb {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  list-style: none;
  padding: 0.5rem 0;
  margin: 0;
  gap: 0.25rem;
}

.breadcrumb-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: var(--color-secondary);
}

.breadcrumb-item a {
  color: var(--color-white);
}

.breadcrumb-sep {
  opacity: 0.6;
}
</style>
