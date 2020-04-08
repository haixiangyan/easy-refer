import express from 'express'
import Mock from 'mockjs'
import {User, Job, Resume} from '../mocks/objects'

// '/auth'
const AuthRouter = express.Router()

// 登录
AuthRouter.post('/login', (req, res) => {
  res.json(Mock.mock({
    user: User,
    job: Job,
    resume: Resume
  }))
})

// 注册
AuthRouter.post('/register', (req, res) => {
  res.json(Mock.mock(User))
})
