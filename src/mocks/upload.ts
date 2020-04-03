import Mock from 'mockjs'

Mock.mock('/user-resume', 'post', {
  resumeUrl: '@URL',
  resumeName: '@URL'
})
