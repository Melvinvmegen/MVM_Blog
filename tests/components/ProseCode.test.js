// @vitest-environment happy-dom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import ProseCode from '../../app/components/content/ProseCode.vue'

const mountProseCode = () =>
  mount(ProseCode, {
    props: { code: 'const x = 1', language: 'js' },
    slots: { default: '<pre><code>const x = 1</code></pre>' },
    global: {
      stubs: {
        Icon: { template: '<span @click="$emit(\'click\')" />', emits: ['click'] },
      },
    },
    attachTo: document.body,
  })

describe('ProseCode', () => {
  afterEach(() => {
    vi.restoreAllMocks()
    document.body.innerHTML = ''
  })

  describe('copyToClipboard — with navigator.clipboard', () => {
    beforeEach(() => {
      Object.defineProperty(navigator, 'clipboard', {
        value: { writeText: vi.fn().mockResolvedValue(undefined) },
        configurable: true,
      })
    })

    it('writes code text to clipboard', async () => {
      const wrapper = mountProseCode()
      await wrapper.vm.copyToClipboard()
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith('const x = 1')
    })

    it('sets copied to true after write', async () => {
      const wrapper = mountProseCode()
      await wrapper.vm.copyToClipboard()
      expect(wrapper.vm.copied).toBe(true)
    })

    it('resets copied to false after 2000ms', async () => {
      vi.useFakeTimers()
      const wrapper = mountProseCode()
      await wrapper.vm.copyToClipboard()
      expect(wrapper.vm.copied).toBe(true)
      vi.advanceTimersByTime(2000)
      expect(wrapper.vm.copied).toBe(false)
      vi.useRealTimers()
    })
  })

  describe('copyToClipboard — clipboard unavailable (fallback)', () => {
    beforeEach(() => {
      Object.defineProperty(navigator, 'clipboard', {
        value: undefined,
        configurable: true,
      })
      document.execCommand = vi.fn().mockReturnValue(true)
    })

    it('falls back to execCommand copy', async () => {
      const wrapper = mountProseCode()
      await wrapper.vm.copyToClipboard()
      expect(document.execCommand).toHaveBeenCalledWith('copy')
    })

    it('removes the temporary textarea after copy', async () => {
      const wrapper = mountProseCode()
      await wrapper.vm.copyToClipboard()
      expect(document.body.querySelector('textarea')).toBeNull()
    })
  })
})
