import Mock from 'mockjs'

Mock.mock('/user', 'put', (options: any) => JSON.parse(options.body).userForm)
