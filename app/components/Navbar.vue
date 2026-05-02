<template>
  <nav class="relative shadow bg-header">
    <div class="h-40 md-py-4 py-8">
      <div class="flex flex-col container w-10-12 mx-auto md-flex-row md-items-center md-justify-between">
        <div class="flex justify-between items-center">
          <NuxtLink to="/" class="text-secondary no-underline text-xl font-bold md-text-2xl">MVM</NuxtLink>
          <div>
            <button
              v-if="drawer"
              type="button"
              class="block text-white hover-text-gray-600 focus-text-gray-600 focus-outline-none md-hidden"
              @click="emit('openDrawer')"
            >
              <Icon name="mdi:close" size="24" class="cursor-pointer z-50" />
            </button>
            <button
              v-else
              aria-label="MenuSidebar"
              type="button"
              class="block text-white hover-text-gray-600 focus-text-gray-600 focus-outline-none md-hidden"
              @click="emit('openDrawer')"
            >
              <Icon name="mdi:menu" size="24" class="cursor-pointer" />
            </button>
          </div>
        </div>
        <div class="hidden md-flex flex-col md-flex-row md--mx-4">
          <NuxtLink
            v-for="item in nav_items"
            :key="item.name"
            :to="item.link"
            class="my-1 hover-text-secondary px-4 py-2 rounded-md no-underline"
            active-class="text-secondary"
          >
            {{ item.name }}
          </NuxtLink>
        </div>
        <div class="hidden md-flex flex-col md-flex-row md--mx-4">
          <Icon v-if="themeIsLight" name="mdi:moon-waxing-crescent" size="24" class="cursor-pointer hover-text-gray-800" @click="toggleTheme" />
          <Icon v-else name="mdi:white-balance-sunny" size="24" class="cursor-pointer hover-text-secondary" @click="toggleTheme" />
        </div>
      </div>
      <div class="custom-curve">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            class="shape-fill"
          ></path>
        </svg>
      </div>
    </div>
  </nav>
</template>
<script setup lang="ts">
const { t: $t } = useI18n();
const emit = defineEmits(["openDrawer"]);

defineProps({
  drawer: {
    type: Boolean,
    required: true,
  },
});

const nav_items = [
  { name: $t("menu.posts"), link: "/posts" },
  { name: $t("menu.snippets"), link: "/snippets" },
];

const themeIsLight = ref(false);
function toggleTheme() {
  themeIsLight.value = !themeIsLight.value;
}
</script>
<style scoped>
.bg-header {
  background: linear-gradient(0deg, #4b4533, #000000) !important;
  transition:
    #4b4533 350ms linear 0s,
    #000000 350ms linear 0s;
}

.custom-curve {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
}

.custom-curve svg {
  position: relative;
  display: block;
  width: calc(100% + 1.3px);
  height: 60px;
}

.custom-curve .shape-fill {
  fill: #000000;
}
</style>
