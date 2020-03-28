import Mock from 'mockjs'

Mock.mock('/login', 'post', {
  success: true,
  message: '欢迎回来',
  content: {
    userId: '@ID',
    jobId: '@ID',
    email: '@EMAIL',
    name: '@CNAME',
    experience: '@INTEGER(0,4)',
    intro: '@CPARAGRAPH',
    phone: '9493467358',
    referLinks: ['@URL', '@URL'].join(','),
    leetCodeUrl: '@URL',
    thirdPersonIntro: '@CPARAGRAPH',
    resumeUrl: '@URL'
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
