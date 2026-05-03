import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { createSSRApp, h } from 'vue'
import { renderToString } from '@vue/server-renderer'

vi.mock('#imports', () => ({
  queryCollection: vi.fn(),
  useAsyncData: vi.fn(),
}))

const { queryCollection } = await import('#imports')
const { default: StaticContentRenderer } = await import('../../app/components/StaticContentRenderer.server.vue')

const renderComponent = (props) => {
  const app = createSSRApp(StaticContentRenderer, props)
  return renderToString(app)
}

describe('StaticContentRenderer', () => {
  let builder

  beforeEach(() => {
    builder = {
      path: vi.fn().mockReturnThis(),
      first: vi.fn().mockResolvedValue({ body: {} }),
    }
    queryCollection.mockReturnValue(builder)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('queries posts collection by default', async () => {
    await renderComponent({ path: '/posts/js/my-post', collection: 'posts' })
    expect(queryCollection).toHaveBeenCalledWith('posts')
  })

  it('queries snippets collection when collection prop is snippets', async () => {
    await renderComponent({ path: '/snippets/amount', collection: 'snippets' })
    expect(queryCollection).toHaveBeenCalledWith('snippets')
    expect(queryCollection).not.toHaveBeenCalledWith('posts')
  })

  it('queries the given path on the collection', async () => {
    await renderComponent({ path: '/snippets/amount', collection: 'snippets' })
    expect(builder.path).toHaveBeenCalledWith('/snippets/amount')
  })
})
