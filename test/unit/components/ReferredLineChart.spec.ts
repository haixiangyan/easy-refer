import {mount} from '@vue/test-utils'
import ReferredLineChart from '~/components/StatusChart.vue'

describe('ReferredLineChart', () => {
  it('正常显示', () => {
    const dataSource = [{
        date: '2019-01-01',
        count: 100
      }]

    const wrapper = mount(ReferredLineChart, {
      propsData: {dataSource},
      stubs: ['ve-line']
    })

    expect(wrapper.exists()).toBe(true)
  })
})
