import Mock from 'mockjs'

Mock.mock('/user-resume', 'post', {
  resumeUrl: '@URL',
  resumeName: '@URL'
})

Mock.mock('/refer-resume', 'post', {
  resumeUrl: '@URL',
  resumeName: '@URL'
})
