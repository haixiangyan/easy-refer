import Mock from 'mockjs'

const companies = ['Facebook', 'Google', 'Linkedin', 'Amazon', 'Databricks', 'BrixLabs']

Mock.mock(/\/jobs\?page\d*/, 'get', {
  success: true,
  message: '成功获取数据',
  'content|10': {
    'jobs|10': [{
      'id|+1': 1,
      title: '@CSENTENCE',
      content: '@CPARAGRAPH',
      'company|1': companies,
      imageUrl: "@DATAIMAGE('50x50','@company')",
    }],
    totalPages: 60
  }
})
