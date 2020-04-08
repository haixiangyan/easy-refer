import Mock from 'mockjs'
import {Job, JobItem} from './MockObject'

// 获取一个 job item
Mock.mock(/\/jobs\/item\/\d*/,  'get', JobItem)

// 获取 job item list
Mock.mock(/\/jobs\/item\?.*/,  'get', {
  'jobItemList|10': [JobItem],
  totalPages: 100
})

// 获取一个 job
Mock.mock(/\/jobs\/\d*/,  'get', Job)

// 生成一个 job
Mock.mock('/jobs',  'post', (options: any) => JSON.parse(options.body))

// 修改一个 job
Mock.mock(/\/jobs\/\d*/,  'put', (options: any) => JSON.parse(options.body))
