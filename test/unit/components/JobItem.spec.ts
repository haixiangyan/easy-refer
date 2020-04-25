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
  it('禁止用户自己内推自己', () => {
    const wrapper = shallowMount(JobItemVue, {
      localVue,
      propsData: {job: {...job, refererId: userInfo.userId}},
      mocks: {
        $route: {name: 'job-list'},
        $auth: {loggedIn: true, user: {info: userInfo}}
      },
      stubs: ['nuxt-link']
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.apply-refer el-button-stub').attributes('disabled')).toBe('true')
  })
  it('不是 Job List 的路由，不显示内推按钮', () => {
    const wrapper = shallowMount(JobItemVue, {
      localVue,
      propsData: {job},
      mocks: {
        $route: {name: 'my-refer-list'},
        $auth: {loggedIn: false}
      },
      stubs: ['nuxt-link']
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.apply-refer').classes('show-apply')).toBe(false)
  })
})
