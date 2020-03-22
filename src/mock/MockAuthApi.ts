import Mock from 'mockjs'

Mock.mock(
  '/login',
  (): ILoginData => ({
    success: true,
    message: '登录成功'
  })
)
