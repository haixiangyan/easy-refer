import Mock from 'mockjs'

Mock.mock(/\/resumes\/\d*/, 'get', {
  resumeId: '@ID',
  url: '@URL',
  name: '@URl'
})
