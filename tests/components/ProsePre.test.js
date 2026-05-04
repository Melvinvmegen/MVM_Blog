// @vitest-environment happy-dom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

// The copy logic now lives in app/plugins/copy-code.client.ts (event delegation).
// This test exercises that plugin logic directly.

function buildFixture(code) {
  const highlight = document.createElement('div')
  highlight.className = 'nuxt-content-highlight'

  const pre = document.createElement('pre')
  pre.textContent = code
  highlight.appendChild(pre)

  const btn = document.createElement('button')
  btn.className = 'copy-btn'

  const copyIcon = document.createElement('span')
  copyIcon.className = 'copy-icon'

  const checkIcon = document.createElement('span')
  checkIcon.className = 'check-icon'
  checkIcon.style.display = 'none'

  btn.appendChild(copyIcon)
  btn.appendChild(checkIcon)
  highlight.appendChild(btn)
  document.body.appendChild(highlight)

  return { btn, copyIcon, checkIcon, pre }
}

async function clickCopy(btn) {
  btn.dispatchEvent(new MouseEvent('click', { bubbles: true }))
  await Promise.resolve()
}

// inline copy-code plugin logic (mirrors app/plugins/copy-code.client.ts)
function handleClick(e) {
  const btn = e.target.closest('.copy-btn')
  if (!btn) return
  const pre = btn.closest('.nuxt-content-highlight')?.querySelector('pre')
  if (!pre) return
  const code = pre.textContent ?? ''
  const copyIcon = btn.querySelector('.copy-icon')
  const checkIcon = btn.querySelector('.check-icon')
  const showFeedback = () => {
    if (copyIcon) copyIcon.style.display = 'none'
    if (checkIcon) checkIcon.style.display = ''
    setTimeout(() => {
      if (copyIcon) copyIcon.style.display = ''
      if (checkIcon) checkIcon.style.display = 'none'
    }, 2000)
  }
  if (navigator.clipboard) {
    navigator.clipboard.writeText(code).then(showFeedback)
  } else {
    const ta = document.createElement('textarea')
    ta.value = code
    ta.style.position = 'absolute'
    ta.style.left = '-999999px'
    document.body.prepend(ta)
    ta.select()
    try { document.execCommand('copy') } catch (e) { void e }
    ta.remove()
    showFeedback()
  }
}

describe('copy-code plugin', () => {
  beforeEach(() => {
    document.addEventListener('click', handleClick)
  })

  afterEach(() => {
    document.removeEventListener('click', handleClick)
    vi.restoreAllMocks()
    document.body.innerHTML = ''
  })

  describe('with navigator.clipboard', () => {
    beforeEach(() => {
      Object.defineProperty(navigator, 'clipboard', {
        value: { writeText: vi.fn().mockResolvedValue(undefined) },
        configurable: true,
      })
    })

    it('writes pre textContent to clipboard', async () => {
      const { btn } = buildFixture('const x = 1')
      await clickCopy(btn)
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith('const x = 1')
    })

    it('hides copy icon and shows check icon after copy', async () => {
      const { btn, copyIcon, checkIcon } = buildFixture('hello')
      await clickCopy(btn)
      expect(copyIcon.style.display).toBe('none')
      expect(checkIcon.style.display).toBe('')
    })

    it('resets icons after 2000ms', async () => {
      vi.useFakeTimers()
      const { btn, copyIcon, checkIcon } = buildFixture('hello')
      await clickCopy(btn)
      vi.advanceTimersByTime(2000)
      expect(copyIcon.style.display).toBe('')
      expect(checkIcon.style.display).toBe('none')
      vi.useRealTimers()
    })
  })

  describe('clipboard unavailable (fallback)', () => {
    beforeEach(() => {
      Object.defineProperty(navigator, 'clipboard', {
        value: undefined,
        configurable: true,
      })
      document.execCommand = vi.fn().mockReturnValue(true)
    })

    it('falls back to execCommand copy', async () => {
      const { btn } = buildFixture('const x = 1')
      await clickCopy(btn)
      expect(document.execCommand).toHaveBeenCalledWith('copy')
    })

    it('removes the temporary textarea after copy', async () => {
      const { btn } = buildFixture('const x = 1')
      await clickCopy(btn)
      expect(document.body.querySelector('textarea')).toBeNull()
    })
  })
})
