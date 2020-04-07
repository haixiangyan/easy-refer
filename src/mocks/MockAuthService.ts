import Mock from 'mockjs'
import {Job, Resume, User} from '@/mocks/MockObject'

// 登录
Mock.mock('/login', 'post', {
  user: User,
  job: Job,
  resume: Resume
})

// 注册
Mock.mock('/register', 'post', User)
