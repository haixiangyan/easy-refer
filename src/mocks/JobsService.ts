import Mock from 'mockjs'
import {JobItem} from './objects'

Mock.mock(/\/jobs\/item\/\d*/,  'get', JobItem)

Mock.mock(/\/jobs\/item\?.*/,  'get', {
  'jobItemList|10': [JobItem],
  totalPages: 100
})
