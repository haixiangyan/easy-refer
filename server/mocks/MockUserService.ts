import Mock from 'mockjs'

// 全部修改用户
Mock.mock('/user', 'put', (options: any) => JSON.parse(options.body).userForm)
