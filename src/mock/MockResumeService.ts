import Mock from 'mockjs'

Mock.mock(/\/resume\?userId=\S*&page=\d*/, 'get', {
  success: true,
  message: '成功获取数据',
  content: {
    'resumes|20': [{
      'resumeId|+1': 1,
      name: '@CNAME',
      createdAt: "@date('yyyy年MM月dd日')",
      experience: '@INTEGER(0,7)'
    }],
    totalPages: 60
  }
})

Mock.mock(/\/resume\?resumeId=\S*/, 'get', {
  success: true,
  message: '成功获取数据',
  content: {
    // 必填
    applicationId: "@ID",
    jobId: "@ID",
    userId: "@ID",
    email: "@EMAIL",
    name: "@CNAME",
    experience: '@INTEGER(0,8)',
    // 选填
    intro: '@CPARAGRAPH',
    leetCodeUrl: '@URL',
    phone: '9493467287',
    referLinks: '@URL',
    resumeUrl: "@URL",
    thirdPersonIntro: "@CPARAGRAPH",
  }
})

Mock.mock('/resume', 'post', (options: any) => {
  return {
    success: true,
    message: '信息已提交',
    content: JSON.parse(options.body)
  }
})

Mock.mock('/resume', 'put', (options: any) => {
  const body = JSON.parse(options.body)
  const success = body.status === 'referred'
  const message = success ? '完成内推' : '已回绝'
  return { success, message }
})
