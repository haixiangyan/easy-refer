import {shallowMount, createLocalVue} from '@vue/test-utils'
import Element from 'element-ui'

import Empty from '@/components/Empty.vue'

const localVue = createLocalVue()
localVue.use(Element)

describe('Empty', () => {
  it('正常显示', () => {
    const wrapper = shallowMount(Empty, {
      localVue
    })

    expect(wrapper.exists()).toBe(true)
  })
})
