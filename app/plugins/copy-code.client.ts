export default defineNuxtPlugin(() => {
  document.addEventListener('click', (e: MouseEvent) => {
    const btn = (e.target as Element).closest<HTMLElement>('.copy-btn')
    if (!btn) return

    const pre = btn.closest('.nuxt-content-highlight')?.querySelector('pre')
    if (!pre) return

    const code = pre.textContent ?? ''
    const copyIcon = btn.querySelector<HTMLElement>('.copy-icon')
    const checkIcon = btn.querySelector<HTMLElement>('.check-icon')

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
      try { document.execCommand('copy') } catch (_) { /* noop */ }
      ta.remove()
      showFeedback()
    }
  })
})
