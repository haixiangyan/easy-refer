import Mock from 'mockjs'

// 上传个人简历
Mock.mock('/user-resume', 'post', {
  resumeId: '@ID',
  resumeUrl: '@URL',
  resumeName: '@URL',
})

// 上传内推时的简历
Mock.mock('/refer-resume', 'post', {
  resumeId: '@ID',
  resumeUrl: '@URL',
  resumeName: '@URL',
})

// 上传用户头像
Mock.mock('/avatar', 'post', {
  avatarUrl: Mock.Random.dataImage('100x100', '新头像')
})
