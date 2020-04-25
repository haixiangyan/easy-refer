import express from 'express'
import Mock from 'mockjs'
import {Refer} from '../template'

// '/refers'
const RefersRouter = express.Router()

// 获取 Refer List
RefersRouter.get('/', (req, res) => {
  res.json(Mock.mock({
    'referList|10': [Refer],
    total: 100
  }))
})

// 获取一个 Refer
RefersRouter.get('/:referId', (req, res) => {
  res.json(Mock.mock(Refer))
})

// 创建 Refer
RefersRouter.post('/:jobId', (req, res) => {
  res.json(Mock.mock(Refer))
})

// 部分修改 Refer
RefersRouter.patch('/:referId', (req, res) => {
  res.json(Mock.mock(Refer))
})

// 删除 Refer
RefersRouter.delete('/:referId', (req, res) => {
  res.json({})
})

export default RefersRouter
