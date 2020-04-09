import {shallowMount, createLocalVue} from '@vue/test-utils'
import Element from 'element-ui'

import Footer from '@/components/Footer.vue'

const localVue = createLocalVue()
localVue.use(Element)

describe('Footer', () => {
  it('正常显示', () => {
    const wrapper = shallowMount(Footer, {
      localVue
    })

    expect(wrapper.exists()).toBe(true)
  })
})
