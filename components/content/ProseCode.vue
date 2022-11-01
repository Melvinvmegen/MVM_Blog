<script lang="ts">
export default defineComponent({
  props: {
    code: {
      type: String,
      default: "",
    },
    language: {
      type: String,
      default: null,
    },
    filename: {
      type: String,
      default: null,
    },
    highlights: {
      type: Array as () => number[],
      default: () => [],
    },
  },
  setup( props ): any {
    const codeBlock = ref(null);
    const copied = ref(false);
    const timeout_id = ref(null);

    function copyToClipboard() {
      navigator.clipboard.writeText(codeBlock.value.querySelector("pre code").innerText).then(() => {
        copied.value = true;
         
        clearTimeout(timeout_id.value)
        timeout_id.value = setTimeout(() => copied.value = false, 2000)
      });
    }

    return { copyToClipboard, codeBlock, copied }
  }
});
</script>

<template>
  <div class="nuxt-content-highlight" ref="codeBlock">
    <slot />
    <div class="filename">{{ filename || "JS" }}</div>
    <v-btn
      color="white"
      class="copy"
      icon="fas-check"
      variant="outlined"
      @click="copyToClipboard"
      v-if="copied"
    >
      <Icon name="mdi:check" size="24" />
    </v-btn>
    <v-btn
      color="white"
      class="copy"
      icon
      variant="outlined"
      @click="copyToClipboard"
      v-else
    >
      <Icon name="mdi:content-copy" size="24" />
    </v-btn>

  </div>
</template>

<style>
pre code .line {
  display: block;
  min-height: 1rem;
}

.nuxt-content-highlight {
  position: relative;

  /* Style filename span added by @nuxt/content */
}

.nuxt-content-highlight > .filename {
  position: absolute;
  right: 0;
  top: -30px;
  z-index: 10;
  margin-top: 8px;
  background-color: #f9d262;
  color: black;
  border-radius: 5px;
  padding-right: 20px;
  padding-left: 20px;
  border-bottom: 2px solid #2f2e2a;
}

.nuxt-content-highlight > .copy {
  position: absolute;
  right: 10px;
  bottom: 10px;
  border: none;
}
</style>
