import Mock from 'mockjs'

Mock.mock('/login', {
  success: true,
  message: '欢迎回来！'
})
