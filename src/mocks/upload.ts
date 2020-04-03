import faker from 'faker'
import Mock from 'mockjs'

Mock.mock('/user-resume', 'post', {
  resumeUrl: faker.internet.url(),
  resumeName: faker.internet.url()
})

Mock.mock('/refer-resume', 'post', {
  resumeUrl: faker.internet.url(),
  resumeName: faker.internet.url()
})

Mock.mock('/avatar', 'post', {
  avatarUrl: faker.image.avatar()
})
