import Mock from 'mockjs'

Mock.mock(/\/resumes\?userId=\S*&page=\d*/, 'get', {
  success: true,
  message: '成功获取数据',
  'content|10': {
    'resumes|10': [{
      'id|+1': 1,
    }],
    totalPages: 60
  }
})
