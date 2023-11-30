<script setup>
defineProps({
  imgSrc: {
    type: String,
    required: true,
  },
  sizes: {
    type: String,
    default: "90vw sm:70vw md:40vw"
  }
});
</script>

<template>
  <NuxtImg provider="cloudinary" :src="imgSrc" class="my-4" :sizes="sizes" />
</template>