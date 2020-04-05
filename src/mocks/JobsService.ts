import Mock from 'mockjs'
import {JobItem} from './objects'

Mock.mock(RegExp('/jobs/item/\d*$'),  'get', {
  ...JobItem,
})

Mock.mock(RegExp('/jobs/item?.*'),  'get', {
  'jobItemList|10': [JobItem],
  totalPages: 100
})
