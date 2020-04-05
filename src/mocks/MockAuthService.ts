import Mock from 'mockjs'
import {Job, Resume, User} from '@/mocks/MockObject'

Mock.mock('/login', 'post', {
  user: User,
  job: Job,
  resume: Resume
})

Mock.mock('/register', 'post', User)
