import express from 'express'
import Mock from 'mockjs'

import {User} from '../template'

// '/users'
const UsersRouter = express.Router()

// 修改 User
UsersRouter.put('/', (req, res) => {
  res.json(Mock.mock(User))
})

export default UsersRouter
