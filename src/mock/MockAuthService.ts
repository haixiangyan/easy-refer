import Mock from 'mockjs'

Mock.mock('/login', 'post', {
  success: true,
  message: '欢迎回来',
  content: {
    userId: '@ID',
    email: '@EMAIL',
    name: '@CNAME'
  }
})

Mock.mock('/register', 'post', {
  success: true,
  message: '注册成功',
  content: {
    email: 'xxx@yyy.com',
    password: '12345678'
  }
})
