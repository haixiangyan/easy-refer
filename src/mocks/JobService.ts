import Mock from 'mockjs'
import {Job, JobItem} from './objects'

Mock.mock(/\/jobs\/item\/\d*/,  'get', JobItem)

Mock.mock(/\/jobs\/item\?.*/,  'get', {
  'jobItemList|10': [JobItem],
  totalPages: 100
})

Mock.mock(/\/jobs\/\d*/,  'get', Job)

Mock.mock('/jobs',  'post', (options: any) => JSON.parse(options.body))
Mock.mock(/\/jobs\/\d*/,  'put', (options: any) => JSON.parse(options.body))
