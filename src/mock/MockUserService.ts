import Mock from 'mockjs'

Mock.mock(/\/user\/intro\?userId=[a-zA-Z]*/, 'get', {
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
