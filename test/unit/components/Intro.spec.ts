import Mock from 'mockjs'
import Element from 'element-ui'
import {shallowMount, createLocalVue} from '@vue/test-utils'
import Intro from '@/components/Intro.vue'
import {Job, User} from '@/mocks/template'

// 创建 $auth.user
const localVue = createLocalVue()
localVue.use(Element)

const user = Mock.mock(User)
const job = Mock.mock(Job)

describe('Intro', () => {
  it('正常显示', () => {
    const wrapper = shallowMount(Intro, {
      localVue,
      mocks: {
        $auth: {user: {info: user, job}}
      },
      stubs: ['nuxt-link']
    })

    expect(wrapper.exists()).toBe(true)
  })
  it('正确渲染没有发布职位时的样式', () => {
    const wrapper = shallowMount(Intro, {
      localVue,
      mocks: {
        $auth: {
          loggedIn: true,
          user: {info: {...user}, job: null}
        }
      },
      stubs: ['nuxt-link']
    })

    // 添加职位/修改职位按钮
    const jobButton = wrapper.findAll('.button').at(1)
    expect(jobButton.text()).toBe('发布内推职位')

    // 内推职位链接
    const linkDiv = wrapper.find('.link')
    expect(linkDiv.exists()).toBe(false)
  })
  it('正确渲染有发布职位时的样式', () => {
    const wrapper = shallowMount(Intro, {
      attachToDocument: true,
      localVue,
      mocks: {
        $auth: {
          loggedIn: true,
          user: {info: {...user}, job}
        }
      },
      stubs: ['nuxt-link']
    })

    // 添加职位/修改职位按钮
    const jobButton = wrapper.findAll('.button').at(1)
    expect(jobButton.text()).toBe('修改内推职位')

    // 内推职位链接
    const linkDiv = wrapper.find('.link')
    expect(linkDiv.exists()).toBe(true)

    const link = linkDiv.find('nuxt-link-stub').attributes('to')
    expect(link).toEqual(`/refer/apply/${job.jobId}`)

    // @ts-ignore
    expect(wrapper.vm.clipboard).toBeTruthy()
    wrapper.destroy()
    // @ts-ignore
    expect(wrapper.vm.clipboard).toBeFalsy()
  })
  it('正确计算百分比', () => {
    const wrapper = shallowMount(Intro, {
      localVue,
      mocks: {
        $auth: {
          loggedIn: true,
          user: {info: {...user}, job}
        }
      },
      stubs: ['nuxt-link']
    })

    const referRate = (user.processedOtherReferCount / user.otherReferTotal * 100).toFixed(2) + '%'
    const approvedRate = (user.processedMyReferCount / user.myReferTotal * 100).toFixed(2) + '%'
    expect(wrapper.findAll('.refer p').at(2).text()).toEqual(referRate)
    expect(wrapper.findAll('.approved p').at(2).text()).toEqual(approvedRate)
  })
  it('总数为0返回0.00%', () => {
    const wrapper = shallowMount(Intro, {
      localVue,
      mocks: {
        $auth: {
          loggedIn: true,
          user: {info: {...user, otherReferTotal: 0}, job}
        }
      },
      stubs: ['nuxt-link']
    })

    expect(wrapper.findAll('.refer p').at(2).text()).toEqual('0.00%')
  })
})
