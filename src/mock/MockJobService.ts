import Mock from 'mockjs'

const companies = ['Facebook', 'Google', 'Linkedin', 'Amazon', 'Databricks', 'BrixLabs']
const types = ['success', 'warning', 'danger', 'info', 'primary']

Mock.mock(/\/jobs\?userId=[a-zA-Z]*&page=\d*/, 'get', {
  success: true,
  message: '成功获取数据',
  content: {
    'jobs|10': [{
      'id|+1': 1,
      title: '@CSENTENCE',
      content: '@CPARAGRAPH',
      'company|1': companies,
      'tags|3': [{
        'type|1': types,
        text: '@CWORD(3,5)'
      }],
      referer: '@CNAME',
      imageUrl: "@DATAIMAGE('50x50','@company')",
    }],
    totalPages: 60
  }
})
