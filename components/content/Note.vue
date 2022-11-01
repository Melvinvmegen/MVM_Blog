<template>
  <v-alert type="info" variant="outlined" class="my-6">
    <template v-slot:prepend>
      <Icon name="mdi:information-outline" size="30" />
    </template>
    <slot />
  </v-alert>
</template>
<style>
.v-alert p {
  margin: 0 !important;
}
</style>