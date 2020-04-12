import {shallowMount, createLocalVue} from '@vue/test-utils'
import Mock from 'mockjs'
import Element from 'element-ui'

import Menu from '@/components/Menu.vue'
import {User, Job} from '@/server/mocks/objects'

const localVue = createLocalVue()
localVue.use(Element)

const info = Mock.mock(User)
const job = Mock.mock(Job)

describe('Menu', () => {
  it('正确导航', () => {
    const wrapper = shallowMount(Menu, {
      localVue,
      mocks: {
        $auth: {
          loggedIn: true,
          user: {info, job}
        },
        $route: {path: '/job/list'}
      },
      stubs: ['nuxt-link']
    })

    // 正确跳转路由
    const menuItems = wrapper.findAll('el-menu-item-stub')
    const routes = ['/', '/job/list', '/my/refer-list', '/other/refer-list']
    routes.forEach((route, index) => {
      expect(menuItems.at(index).attributes('index')).toEqual(route)
    })
  })
  it('显示没有登录的样式', () => {

  })
  it('显示登录但是没有发布内推的样式', () => {

  })
})
