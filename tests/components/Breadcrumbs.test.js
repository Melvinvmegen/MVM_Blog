// @vitest-environment happy-dom
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Breadcrumbs from '../../app/components/Breadcrumbs.vue'

const mountBreadcrumbs = (item) =>
  mount(Breadcrumbs, {
    props: { item },
    global: {
      stubs: {
        NuxtLink: { template: '<a :href="to"><slot /></a>', props: ['to'] },
        Icon: true,
      },
    },
  })

describe('Breadcrumbs', () => {
  it('renders nothing when item has no path', () => {
    const wrapper = mountBreadcrumbs({})
    expect(wrapper.find('nav').exists()).toBe(false)
  })

  it('renders nothing when path is null', () => {
    const wrapper = mountBreadcrumbs({ path: null })
    expect(wrapper.find('nav').exists()).toBe(false)
  })

  it('home breadcrumb links to /', () => {
    const wrapper = mountBreadcrumbs({ path: '/posts/javascript/my-post' })
    expect(wrapper.findAll('a')[0].attributes('href')).toBe('/')
  })

  it('generates one link per path segment plus home', () => {
    const wrapper = mountBreadcrumbs({ path: '/posts/javascript/my-post' })
    expect(wrapper.findAll('a')).toHaveLength(4)
  })

  it('accumulates path segments correctly', () => {
    const wrapper = mountBreadcrumbs({ path: '/posts/javascript/my-post' })
    const hrefs = wrapper.findAll('a').map((a) => a.attributes('href'))
    expect(hrefs).toEqual(['/', '/posts', '/posts/javascript', '/posts/javascript/my-post'])
  })

  it('capitalizes first letter of each segment', () => {
    const wrapper = mountBreadcrumbs({ path: '/posts/javascript' })
    const links = wrapper.findAll('a')
    expect(links[1].text()).toBe('Posts')
    expect(links[2].text()).toBe('Javascript')
  })

  it('filters out "en" locale segments', () => {
    const wrapper = mountBreadcrumbs({ path: '/en/posts/javascript' })
    const links = wrapper.findAll('a')
    expect(links).toHaveLength(3) // home + posts + javascript
    expect(links.map((l) => l.text())).not.toContain('En')
  })
})
