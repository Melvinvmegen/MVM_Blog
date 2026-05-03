// @vitest-environment happy-dom
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Card from '../../app/components/Card.vue'

const item = {
  path: '/posts/javascript/test-post',
  title: 'Test Post',
  description: 'A test description',
  category: 'JavaScript',
  last_updated: '2024-01-15',
}

const mountCard = (props = { item }) =>
  mount(Card, {
    props,
    global: {
      stubs: {
        NuxtLink: {
          template: '<a :href="to"><slot /></a>',
          props: ['to'],
        },
      },
      mocks: { $t: (key) => key },
    },
  })

describe('Card', () => {
  it('renders title', () => {
    const wrapper = mountCard()
    expect(wrapper.text()).toContain('Test Post')
  })

  it('renders description', () => {
    const wrapper = mountCard()
    expect(wrapper.text()).toContain('A test description')
  })

  it('category link points to lowercased category path', () => {
    const wrapper = mountCard()
    const categoryLink = wrapper.findAll('a').find(a => a.text() === 'JavaScript')
    expect(categoryLink?.attributes('href')).toBe('/posts/javascript')
  })

  it('title link points to item path', () => {
    const wrapper = mountCard()
    const titleLink = wrapper.findAll('a').find(a => a.text() === 'Test Post')
    expect(titleLink?.attributes('href')).toBe('/posts/javascript/test-post')
  })

  it('read more link points to item path', () => {
    const wrapper = mountCard()
    const readMoreLink = wrapper.findAll('a').find(a => a.text() === 'posts.read_more')
    expect(readMoreLink?.attributes('href')).toBe('/posts/javascript/test-post')
  })
})
