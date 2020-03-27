import Mock from 'mockjs'

Mock.mock(/\/user\/intro\?userId=\S*/, 'get', {
  success: true,
  message: '成功获取用户介绍',
  content: {
    avatarUrl: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
    name: '@CNAME',
    finishedRefers: '@INTEGER(0,10)',
    totalRefers: '@INTEGER(10,300)',
    finishedResumes: '@INTEGER(0,20)',
    totalResumes: '@INTEGER(20,300)'
  }
})

Mock.mock(/\/user\/info\?userId=\S*/, 'get', {
  success: true,
  message: '成功获取用户介绍',
  content: {
    userId: '@ID',
    email: '@EMAIL',
    name: '@CNAME',
    experience: '@INTEGER(0,4)',
    intro: '@CPARAGRAPH',
    phone: '9493467358',
    referLinks: ['@URL', '@URL'],
    leetCodeUrl: '@URL',
    thirdPersonIntro: '@CPARAGRAPH',
    resumeUrl: '@URL'
  }
})

Mock.mock('/user/info', 'post', (options: any) => {
  return {
    success: true,
    message: '修改成功',
    content: JSON.parse(options.body)
  }
})
