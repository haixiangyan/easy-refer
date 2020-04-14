import express from 'express'
import Mock from 'mockjs'
import {User, Job, Resume} from '../mocks/objects'
import UserModel from '../models/UserModel'
import {generateJWT} from '../utils/auth'

// '/auth'
const AuthRouter = express.Router()

// 登录
AuthRouter.post('/login', async (req, res) => {
  const {email, password} = req.body
  const user = await UserModel.findOne({
    where: {email}
  })

  if (!user) {
    res.status(401)
    return res.json({
      message: '用户不存在'
    })
  }

  if (user.password !== password) {
    res.status(401)
    return res.json({
      message: '密码不正确'
    })
  }

  return res.json(Mock.mock({
    token: generateJWT(user.userId)
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
