import Mock from 'mockjs'
import {MyRefer, OtherRefer, Refer} from '@/mocks/MockObject'

Mock.mock(/\/refers\?.*/, 'get', (options: any) => {
  const referTemplate = options.url.includes('my') ? MyRefer : OtherRefer
  return Mock.mock({
    'referList|10': [referTemplate],
    totalPages: 100
  })
})

Mock.mock(/\/refers\/d*/, 'get', Refer)

Mock.mock(/\/refers[\/]?\d*/, 'post', (options: any) => JSON.parse(options.body).referForm)

Mock.mock(/\/refers\/d*/, 'patch', Refer)

Mock.mock(/\/refers\/d*/, 'delete', {})
