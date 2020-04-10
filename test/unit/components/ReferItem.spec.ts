import {createLocalVue, mount, shallowMount} from '@vue/test-utils'
import Element from 'element-ui'

import ReferItem from '@/components/ReferItem.vue'

const localVue = createLocalVue()
localVue.use(Element)

const myRefer = {
  referId: '1',
  referer: {
    name: '张三',
  },
  job: {
    jobId: '2',
    company: 'Google',
  },
  status: 'processing',
  updatedAt: new Date().toISOString(),
  source: 'http://google.com'
}

describe('ReferItem', () => {
  afterEach(() => {
    const messageWrapper = document.querySelector('.el-message-box__wrapper')
    if (messageWrapper) {
      messageWrapper.remove()
    }
  })
  it('正常显示', () => {
    const wrapper = shallowMount(ReferItem, {
      localVue,
      propsData: {refer: myRefer},
      stubs: ['nuxt-link']
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('nuxt-link-stub').attributes('to')).toEqual(`/refer/edit/${myRefer.referId}`)
  })
  it('撤回内推', async () => {
    jest.useFakeTimers()
    const deleteHandler = jest.fn()
    const wrapper = mount(ReferItem, {
      localVue,
      attachToDocument: true,
      propsData: {refer: myRefer},
      stubs: ['nuxt-link'],
      mocks: {$axios: {$delete: deleteHandler}}
    })
    expect(deleteHandler).not.toBeCalled()

    // 测试撤回内推
    await wrapper.find('.withdraw-icon').trigger('click')
    await localVue.nextTick()

    await (document.querySelector('.confirm-withdraw') as HTMLButtonElement).click()

    jest.runAllTimers()
    expect(deleteHandler).toBeCalled()
    wrapper.destroy()
  })

  it('取消撤销内推弹窗', async () => {
    jest.useFakeTimers()
    const deleteHandler = jest.fn()
    const wrapper = mount(ReferItem, {
      localVue,
      attachToDocument: true,
      propsData: {refer: myRefer},
      stubs: ['nuxt-link'],
      mocks: {$axios: {$delete: deleteHandler}}
    })
    expect(deleteHandler).not.toBeCalled()

    // 取消弹窗
    await wrapper.find('.withdraw-icon').trigger('click')
    await localVue.nextTick()

    await (document.querySelector('.cancel-withdraw') as HTMLButtonElement).click()

    jest.runAllTimers()
    expect(deleteHandler).not.toBeCalled()
    wrapper.destroy()
  })
})
