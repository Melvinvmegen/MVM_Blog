import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@nuxt/content/server', () => ({
  queryCollection: vi.fn(),
}))

const { mockFeedInstance } = vi.hoisted(() => ({
  mockFeedInstance: {
    item: vi.fn(),
    xml: vi.fn().mockReturnValue('<rss><channel></channel></rss>'),
  },
}))

vi.mock('rss', () => ({
  default: vi.fn().mockImplementation(function () {
    return mockFeedInstance
  }),
}))

const { queryCollection } = await import('@nuxt/content/server')
const handler = (await import('../../server/routes/rss.xml')).default

const makeEvent = () => ({
  path: '/rss.xml',
  node: { res: { setHeader: vi.fn(), end: vi.fn() } },
})

const makeBuilder = (items = []) => ({
  path: vi.fn().mockReturnThis(),
  where: vi.fn().mockReturnThis(),
  orWhere: vi.fn().mockReturnThis(),
  order: vi.fn().mockReturnThis(),
  all: vi.fn().mockResolvedValue(items),
})

describe('RSS handler', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockFeedInstance.xml.mockReturnValue('<rss><channel></channel></rss>')
  })

  it('sets Content-Type to text/xml', async () => {
    queryCollection.mockReturnValue(makeBuilder())
    const event = makeEvent()
    await handler(event)
    expect(event.node.res.setHeader).toHaveBeenCalledWith('Content-Type', 'text/xml')
  })

  it('ends response with feed XML', async () => {
    queryCollection.mockReturnValue(makeBuilder())
    const event = makeEvent()
    await handler(event)
    expect(event.node.res.end).toHaveBeenCalledWith('<rss><channel></channel></rss>')
  })

  it('adds feed item for each content post path', async () => {
    const posts = [{ path: '/posts/javascript/my-post', title: 'My Post', description: 'desc', category: 'JavaScript', last_updated: '2024-01-01' }]
    const snippets = [{ path: '/snippets/my-snippet', title: 'My Snippet', description: 'snip', category: 'CSS', last_updated: '2024-02-01' }]
    queryCollection.mockReturnValueOnce(makeBuilder(posts)).mockReturnValueOnce(makeBuilder(snippets))
    await handler(makeEvent())
    expect(mockFeedInstance.item).toHaveBeenCalledTimes(2)
  })

  it('excludes non-content paths (e.g. /privacy-policy)', async () => {
    const contents = [
      { path: '/posts/javascript/my-post', title: 'Post', description: 'd', category: 'JS', last_updated: '2024-01-01' },
      { path: '/privacy-policy', title: 'Privacy', description: 'd', category: null, last_updated: '2024-01-01' },
    ]
    queryCollection.mockReturnValueOnce(makeBuilder(contents)).mockReturnValueOnce(makeBuilder([]))
    await handler(makeEvent())
    expect(mockFeedInstance.item).toHaveBeenCalledTimes(1)
    expect(mockFeedInstance.item).toHaveBeenCalledWith(
      expect.objectContaining({ url: 'https://blog.melvinvmegen.com/posts/javascript/my-post' })
    )
  })

  it('constructs absolute URL and maps all item fields', async () => {
    const posts = [
      { path: '/posts/javascript/my-post', title: 'Post', description: 'desc', category: 'JS', last_updated: '2024-01-01' },
    ]
    queryCollection.mockReturnValueOnce(makeBuilder(posts)).mockReturnValueOnce(makeBuilder([]))
    await handler(makeEvent())
    expect(mockFeedInstance.item).toHaveBeenCalledWith({
      title: 'Post',
      url: 'https://blog.melvinvmegen.com/posts/javascript/my-post',
      description: 'desc',
      categories: ['JS'],
      date: '2024-01-01',
    })
  })

  it('handles empty content list without throwing', async () => {
    queryCollection.mockReturnValue(makeBuilder([]))
    await expect(handler(makeEvent())).resolves.not.toThrow()
    expect(mockFeedInstance.item).not.toHaveBeenCalled()
  })
})
