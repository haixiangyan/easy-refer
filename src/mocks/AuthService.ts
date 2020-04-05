import Mock from 'mockjs'
import {User} from '@/mocks/objects'

Mock.mock('/login', 'post', User)

Mock.mock('/register', 'post', User)
