import {shallowMount, createLocalVue} from '@vue/test-utils'
import Mock from 'mockjs'
import Element from 'element-ui'

import JobItemVue from '@/components/JobItem.vue'

import {JobItem} from '@/test/mocks/objects'

const localVue = createLocalVue()
localVue.use(Element)

const jobItem = Mock.mock(JobItem)

const jobListRouteName = 'job-list'

describe('JobItem', () => {
  it('正常显示', () => {
    const wrapper = shallowMount(JobItemVue, {
      localVue,
      propsData: {jobItem},
      mocks: {
        $route: {name: jobListRouteName}
      },
      stubs: ['nuxt-link']
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.apply-refer').exists()).toBe(true)
  })
  it('显示0%和不显示内推按钮', () => {
    const wrapper = shallowMount(JobItemVue, {
      localVue,
      propsData: {jobItem: {...jobItem, referTotal: 0}},
      mocks: {
        $route: {name: 'my-refer-list'}
      },
      stubs: ['nuxt-link']
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.apply-refer').exists()).toBe(false)
    expect(wrapper.find('el-progress-stub').attributes('percentage')).toEqual('0')
  })
})
