import express from 'express'
import Mock from 'mockjs'
import {Job, JobItem} from '../template'

// '/jobs'
const JobsRouter = express.Router()

// 获取 Job item list
JobsRouter.get('/item', (req, res) => {
  res.json(Mock.mock({
    'jobItemList|10': [JobItem],
    totalPages: 100
  }))
})

// 获取一个 Job item
JobsRouter.get('/item/:jobId', (req, res) => {
  res.json(Mock.mock(JobItem))
})

// 获取一个 Job
JobsRouter.get('/:jobId', (req, res) => {
  res.json(Mock.mock(Job))
})

// 创建一个 Job
JobsRouter.post('/', (req, res) => {
  res.json(Mock.mock(Job))
})

// 修改一个 Job
JobsRouter.put('/:jobId', (req, res) => {
  res.json(Mock.mock(Job))
})

export default JobsRouter
