import express from 'express'
import Mock from 'mockjs'

import {Job, User} from '../template'

// '/users'
const UsersRouter = express.Router()

// 修改 User
UsersRouter.put('/', (req, res) => {
  res.json(Mock.mock(User))
})

// 获取个人信息
UsersRouter.get('/', (req, res) => {
  res.json(Mock.mock({
    info: User,
    job: Job
  }))
})

export default UsersRouter
