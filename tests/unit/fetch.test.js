import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

const makeBuilder = () => {
  const builder = {
    where: vi.fn().mockReturnThis(),
    order: vi.fn().mockReturnThis(),
    limit: vi.fn().mockReturnThis(),
    all: vi.fn().mockResolvedValue([]),
    first: vi.fn().mockResolvedValue(null),
  }
  return builder
}

vi.mock('#imports', () => ({
  queryCollection: vi.fn(),
}))

const { queryCollection } = await import('#imports')
const { default: useFetch } = await import('../../app/composables/fetch.js')

describe('useFetch', () => {
  let builder

  beforeEach(() => {
    builder = makeBuilder()
    queryCollection.mockReturnValue(builder)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('fetchAll', () => {
    it('always excludes drafts', async () => {
      const { fetchAll } = useFetch()
      await fetchAll('posts')
      expect(builder.where).toHaveBeenCalledWith('draft', 'IS NOT', true)
    })

    it('excludes drafts for records without draft field (NULL-safe)', async () => {
      const { fetchAll } = useFetch()
      await fetchAll('snippets')
      // Must use IS NOT, not <>, so NULL draft records (no draft field) are included
      const call = builder.where.mock.calls.find(c => c[0] === 'draft')
      expect(call).toBeDefined()
      expect(call[1]).toBe('IS NOT')
      expect(call[2]).toBe(true)
      expect(call[1]).not.toBe('<>')
    })

    it('applies limit when provided', async () => {
      const { fetchAll } = useFetch()
      await fetchAll('posts', null, 5)
      expect(builder.limit).toHaveBeenCalledWith(5)
    })

    it('skips limit when not provided', async () => {
      const { fetchAll } = useFetch()
      await fetchAll('posts')
      expect(builder.limit).not.toHaveBeenCalled()
    })

    it('applies single where condition', async () => {
      const { fetchAll } = useFetch()
      await fetchAll('posts', { field: 'category', operator: '=', value: 'vue' })
      expect(builder.where).toHaveBeenCalledWith('category', '=', 'vue')
    })

    it('applies array of where conditions', async () => {
      const { fetchAll } = useFetch()
      const conditions = [
        { field: 'category', operator: '=', value: 'vue' },
        { field: 'id', operator: '>', value: 10 },
      ]
      await fetchAll('posts', conditions)
      expect(builder.where).toHaveBeenCalledWith('category', '=', 'vue')
      expect(builder.where).toHaveBeenCalledWith('id', '>', 10)
    })

    it('sorts by id descending', async () => {
      const { fetchAll } = useFetch()
      await fetchAll('posts')
      expect(builder.order).toHaveBeenCalledWith('id', 'DESC')
    })
  })

  describe('fetchOne', () => {
    it('calls first()', async () => {
      const { fetchOne } = useFetch()
      await fetchOne('posts', { field: 'path', operator: '=', value: '/posts/js/my-post' })
      expect(builder.first).toHaveBeenCalled()
    })

    it('applies where condition', async () => {
      const { fetchOne } = useFetch()
      await fetchOne('posts', { field: 'path', operator: '=', value: '/posts/js/my-post' })
      expect(builder.where).toHaveBeenCalledWith('path', '=', '/posts/js/my-post')
    })

    it('applies array of where conditions', async () => {
      const { fetchOne } = useFetch()
      const conditions = [
        { field: 'id', operator: '=', value: 42 },
        { field: 'path', operator: '=', value: '/posts/js/my-post' },
      ]
      await fetchOne('posts', conditions)
      expect(builder.where).toHaveBeenCalledWith('id', '=', 42)
      expect(builder.where).toHaveBeenCalledWith('path', '=', '/posts/js/my-post')
    })
  })
})
