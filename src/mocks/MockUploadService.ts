import Mock from 'mockjs'

Mock.mock('/user-resume', 'post', {
  resumeId: '@ID',
  resumeUrl: '@URL',
  resumeName: '@URL',
})

Mock.mock('/refer-resume', 'post', {
  resumeId: '@ID',
  resumeUrl: '@URL',
  resumeName: '@URL',
})

Mock.mock('/avatar', 'post', {
  avatarUrl: Mock.Random.dataImage('100x100', '新头像')
})
