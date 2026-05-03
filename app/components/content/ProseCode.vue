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
  setup(props) {
    const codeBlock = ref<HTMLElement | null>(null);
    const copied = ref(false);
    const timeout_id = ref<ReturnType<typeof setTimeout> | null>(null);

    function copyToClipboard() {
      const textToCopy = (codeBlock.value?.querySelector("pre code") as HTMLElement | null)?.innerText ?? "";
      if (navigator.clipboard) {
        navigator.clipboard.writeText(textToCopy).then(() => clearCopy());
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        textArea.style.position = "absolute";
        textArea.style.left = "-999999px";
        document.body.prepend(textArea);
        textArea.select();
        try {
          document.execCommand("copy");
        } catch (error) {
          console.error(error);
        } finally {
          textArea.remove();
        }
      }
    }

    function clearCopy() {
      copied.value = true;
      if (timeout_id.value !== null) clearTimeout(timeout_id.value);
      timeout_id.value = setTimeout(() => (copied.value = false), 2000);
    }

    return { copyToClipboard, codeBlock, copied, props };
  },
});
</script>

<template>
  <div ref="codeBlock" class="nuxt-content-highlight position-relative">
    <slot />
    <div class="filename">{{ language || "JS" }}</div>
    <Icon v-if="copied" name="mdi:check" size="24" class="copy" @click="copyToClipboard" />

    <Icon v-else name="mdi:content-copy" size="24" class="copy cursor-pointer hover-text-secondary" @click="copyToClipboard" />
  </div>
</template>

<style>
pre {
  margin-bottom: 30px;
  overflow-wrap: normal;
  white-space: pre-wrap;
  word-break: normal;
  background-color: #2f2e2a;
  border-radius: 5px;
  padding: 20px;
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
