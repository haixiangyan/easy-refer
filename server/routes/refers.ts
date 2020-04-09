import express from 'express'
import Mock from 'mockjs'
import {MyRefer, OtherRefer, Refer} from '../mocks/objects'

// '/refers'
const RefersRouter = express.Router()

// 获取 My Refer / Other Refer
RefersRouter.get('/', (req, res) => {
  // TODO: 检测 role
  const referTemplate = req.url.includes('my') ? MyRefer : OtherRefer
  res.json(Mock.mock({
    'referList|10': [referTemplate],
    totalPages: 100
  }))
})

// 获取一个 Refer
RefersRouter.get('/:referId', (req, res) => {
  res.json(Mock.mock(Refer))
})

// 创建 Refer
RefersRouter.post('/', (req, res) => {
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
