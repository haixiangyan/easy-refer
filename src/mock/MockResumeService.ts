import Mock from 'mockjs'

Mock.mock(/\/resumes\?page=\d*&userId=[a-zA-Z]*/, 'get', {
  success: true,
  message: '成功获取数据',
  'content|10': {
    'resumes|10': [{
      'id|+1': 1,
    }],
    totalPages: 60
  }
})
