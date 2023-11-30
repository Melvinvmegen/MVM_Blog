<template>
  <div
    class="my-8 w-full flex justify-between items-center rounded-lg border-accent border-2 px-4 py-3 text-base text-accent"
    role="alert"
  >
    <Icon name="mdi:information-outline" size="30" class="md:w-1/12 w-2/12"/>
    <div class="md:w-11/12 w-10/12">
      <slot />
    </div>
  </div>
</template>
<style>
.w-max p {
  margin: 0 !important;
}
</style>