import Mock from 'mockjs'
import {MyRefer, OtherRefer, Refer} from '@/mocks/MockObject'

// 获取 My Refer / Other Refer
Mock.mock(/\/refers\?.*/, 'get', (options: any) => {
  const referTemplate = options.url.includes('my') ? MyRefer : OtherRefer
  return Mock.mock({
    'referList|10': [referTemplate],
    totalPages: 100
  })
})

// 获取一个 refer
Mock.mock(/\/refers\/d*/, 'get', Refer)

// 生成 refer
Mock.mock(/\/refers[\/]?\d*/, 'post', (options: any) => JSON.parse(options.body).referForm)

// 修改 refer
Mock.mock(/\/refers\/d*/, 'patch', Refer)

// 删除 refer
Mock.mock(/\/refers\/d*/, 'delete', {})
