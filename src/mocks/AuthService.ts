import Mock from 'mockjs'
import {Job, User} from '@/mocks/objects'

Mock.mock('/login', 'post', {
  user: User,
  job: Job
})

Mock.mock('/register', 'post', User)
