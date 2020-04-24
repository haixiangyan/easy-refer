import express from 'express'
import Mock from 'mockjs'
import {User} from '../template'

// '/auth'
const AuthRouter = express.Router()

// 登录
AuthRouter.post('/login', (req, res) => {
  res.json(Mock.mock({
    token: '@ID'
  }))
})

// 注册
AuthRouter.post('/register', (req, res) => {
  res.json(Mock.mock(User))
})

export default AuthRouter
