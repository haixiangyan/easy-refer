import Mock from 'mockjs'

Mock.mock(RegExp('/resumes/\d*'), 'get', {
  resumeId: '@ID',
  url: '@URL',
  name: '@URl'
})
