<script setup>
defineProps({
  breadcrumbs: {
    type: Array,
    required: true,
  },
});
</script>
<template>
  <nav class="bg-grey-light w-full rounded-md" v-if="breadcrumbs?.length">
    <ol class="list-reset flex flex-wrap mx-0 py-6">
      <template v-for="(item, index) of breadcrumbs">
        <li> 
          <NuxtLink
            :to="`${item === 'Home' ? '/' : item.path}`"
            class="text-white transition duration-150 ease-in-out hover:text-primary focus:text-primary active:text-primary"
            active-class="text-gray-900"
            >{{ item.title.charAt(0).toUpperCase() + item.title.slice(1) }}</NuxtLink
          >
        </li>
        <li v-if="index + 1 !== breadcrumbs.length">
          <span class="mx-2 text-white"
            ><Icon name="mdi:chevron-right" size="24"
          /></span>
        </li>
      </template>
    </ol>
  </nav>
</template>
