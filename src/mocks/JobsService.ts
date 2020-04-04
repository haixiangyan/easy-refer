import Mock from 'mockjs'
import {JobItem} from './objects'

Mock.mock(RegExp('/jobs/item/\d*$'),  'get', {
  'jobItemList|10': [JobItem],
  totalPages: 100
})

Mock.mock(RegExp('/jobs/item?.*'),  'get', {
  ...JobItem,
})
