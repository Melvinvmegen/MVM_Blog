import { defineComponent, ref, computed, h } from 'vue'

globalThis.defineComponent = defineComponent
globalThis.ref = ref
globalThis.computed = computed
globalThis.h = h
globalThis.useI18n = () => ({ t: (key) => key, locale: ref('en') })
globalThis.defineEventHandler = (fn) => fn
