<template>
  <div
    class="my-8 w-full flex justify-between rounded-lg border-accent border-2 px-6 py-5 text-base text-accent"
    role="alert"
  >
    <Icon name="mdi:information-outline" size="30" class="w-8"/>
    <div class="w-max">
      <slot />
    </div>
  </div>
</template>
<style>
.w-max p {
  margin: 0 !important;
}
</style>
