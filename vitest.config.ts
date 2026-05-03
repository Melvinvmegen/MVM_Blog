import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '#imports': fileURLToPath(new URL('./tests/__stubs__/imports.js', import.meta.url)),
      '#components': fileURLToPath(new URL('./tests/__stubs__/components.js', import.meta.url)),
      '~': fileURLToPath(new URL('./app', import.meta.url)),
      '@': fileURLToPath(new URL('./app', import.meta.url)),
    },
  },
  test: {
    globals: true,
    setupFiles: ['./tests/__stubs__/vue-globals.js'],
    environmentMatchGlobs: [
      ['tests/components/**', 'happy-dom'],
    ],
    environment: 'node',
  },
})
