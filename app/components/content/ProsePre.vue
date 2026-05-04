<script setup lang="ts">
const props = defineProps<{
  code?: string
  language?: string | null
  filename?: string | null
  highlights?: number[]
  meta?: string | null
  class?: string | null
}>()
</script>

<template>
  <div class="nuxt-content-highlight position-relative">
    <pre :class="props.class"><slot /></pre>
    <div class="filename">{{ language || "JS" }}</div>
    <button type="button" class="copy copy-btn cursor-pointer hover-text-secondary" aria-label="Copy code">
      <span class="copy-icon"><Icon name="mdi:content-copy" size="24" /></span>
      <span class="check-icon" style="display:none"><Icon name="mdi:check" size="24" /></span>
    </button>
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
  background: transparent;
  color:  var(--color-white);
}
</style>
