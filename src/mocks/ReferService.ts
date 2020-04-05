import Mock from 'mockjs'
import {MyRefer, OtherRefer} from '@/mocks/objects'

Mock.mock(RegExp('/refers?.*'), 'get', (options: any) => {
  const referTemplate = options.url.includes('my') ? MyRefer : OtherRefer
  return Mock.mock({
    'referList|10': [referTemplate],
    totalPages: 100
  })
})
