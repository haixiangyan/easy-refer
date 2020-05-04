import express from 'express'
import Mock from 'mockjs'
import {User} from '../template'
import dayjs from 'dayjs'

// '/auth'
const AuthRouter = express.Router()

// 登录
AuthRouter.post('/login', (req, res) => {
  res.json(Mock.mock({
    accessToken: '@ID',
    refreshToken: '@ID',
    expireAt: dayjs().add(10, 'day').toISOString()
  }))
})

// 更新 token
AuthRouter.post('/refresh', (req, res) => {
  res.json(Mock.mock({
    accessToken: '@ID',
    refreshToken: '@ID',
    expireAt: dayjs().add(10, 'day').toISOString()
  }))
})

// 激活
AuthRouter.post('/activate', (req, res) => {
  res.json(Mock.mock({
    token: '@ID'
  }))
})

// 注册
AuthRouter.post('/register', (req, res) => {
  res.json(Mock.mock(User))
})

export default AuthRouter
