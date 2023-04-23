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
  setup(props): any {
    const codeBlock = ref(null);
    const copied = ref(false);
    const timeout_id = ref(null);

    function copyToClipboard() {
      navigator.clipboard
        .writeText(codeBlock.value.querySelector("pre code").innerText)
        .then(() => {
          copied.value = true;

          clearTimeout(timeout_id.value);
          timeout_id.value = setTimeout(() => (copied.value = false), 2000);
        });
    }

    return { copyToClipboard, codeBlock, copied, props };
  },
});
</script>

<template>
  <div class="nuxt-content-highlight position-relative" ref="codeBlock">
    <slot />
    <div class="filename">{{ language || "JS" }}</div>
    <Icon
      v-if="copied"
      @click="copyToClipboard"
      name="mdi:check"
      size="24"
      class="copy"
    />

    <Icon
      v-else
      @click="copyToClipboard"
      name="mdi:content-copy"
      size="24"
      class="copy cursor-pointer hover:text-secondary"
    />
  </div>
</template>

<style>
pre {
  margin-bottom: 30px;
  word-break: break-all;
}

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
  right: 20px;
  bottom: 20px;
  border: none;
}
</style>
