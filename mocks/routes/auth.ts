import express from 'express'
import Mock from 'mockjs'
import {User, Job, Resume} from '../template'

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

// 获取个人信息
AuthRouter.get('/user', (req, res) => {
  res.json(Mock.mock({
    info: User,
    job: Job,
    resume: Resume
  }))
})

export default AuthRouter
