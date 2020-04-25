import {shallowMount, createLocalVue} from '@vue/test-utils'
import Mock from 'mockjs'
import Element from 'element-ui'

import JobItemVue from '@/components/JobItem.vue'

import {User, Job} from '@/mocks/template'

const localVue = createLocalVue()
localVue.use(Element)

const job = Mock.mock(Job)
const userInfo = Mock.mock(User)

const jobListRouteName = 'job-list'

describe('JobItem', () => {
  it('正常显示', () => {
    const wrapper = shallowMount(JobItemVue, {
      localVue,
      propsData: {job},
      mocks: {
        $auth: {user: {info: userInfo}},
        $route: {name: jobListRouteName}
      },
      stubs: ['nuxt-link']
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.apply-refer').exists()).toBe(true)
  })
  it('显示0%和显示禁用内推按钮', () => {
    const wrapper = shallowMount(JobItemVue, {
      localVue,
      propsData: {job: {...job, referTotal: 0}},
      mocks: {
        $route: {name: 'my-refer-list'}
      },
      stubs: ['nuxt-link']
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.apply-refer el-button-stub').attributes('disabled')).toBe('true')
    expect(wrapper.find('el-progress-stub').attributes('percentage')).toEqual('0')
  })
})
