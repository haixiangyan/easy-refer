import Mock from 'mockjs'

Mock.mock(
  '/login',
  () => {
    return true
  }
)
