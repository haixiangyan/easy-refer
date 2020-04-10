import {createLocalVue, shallowMount} from '@vue/test-utils'
import Element from 'element-ui'

import CompanyImage from '@/components/CompanyImage.vue'
// 创建 $auth.user
const localVue = createLocalVue()
localVue.use(Element)

const noImageUrl = 'https://dummyimage.com/420x320/ff7f7f/333333.png&text=无'
const waitImageUrl = 'https://dummyimage.com/420x320/ff7f7f/333333.png&text=等'

describe('CompanyImage', () => {
  it('正常显示', () => {
    const imageUrl = 'https://xxx.yyy.png'

    const wrapper = shallowMount(CompanyImage, {
      localVue,
      propsData: {src: imageUrl}
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.attributes('src')).toEqual(imageUrl)
    expect(wrapper.find('img[alt="error"]').attributes('src')).toEqual(noImageUrl)
    expect(wrapper.find('img[alt="placeholder"]').attributes('src')).toEqual(waitImageUrl)
  })
})
