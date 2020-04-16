import dayjs from 'dayjs'

export const users = [
  {
    userId: 'user-1',
    password: '123456',
    email: 'user1@mail.com',
    experience: 2,
    name: '张三',
    intro: '我是张三，这是一份个人介绍',
    leetCodeUrl: 'https://leetcode.com',
    thirdPersonIntro: '这是张三，很完美的第三人称介绍',
    phone: '94934567',
    avatar: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
    jobId: 'job-1'
  },
  {
    userId: 'user-2',
    password: '234567',
    email: 'user2@mail.com',
    experience: 2,
    name: '李四',
    intro: '我是李四，这是一份个人介绍',
    leetCodeUrl: 'https://leetcode.com',
    thirdPersonIntro: '这是李四，很完美的第三人称介绍',
    phone: '94934567',
    avatar: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
    jobId: null
  }
]

export const jobs = [
  {
    jobId: 'job-1',
    company: 'Google',
    requiredFields: ['name', 'email', 'phone', 'experience', 'referLinks', 'resumeUrl', 'intro', 'thirdPersonIntro', 'leetCodeUrl'].join(','),
    deadline: dayjs().add(3, 'month'),
    expiration: 5,
    referTotal: 400,
    source: 'https://www.1point3acres.com/bbs/',
  }
]

export const refers = [
  {
    referId: 'refer-2',
    name: '李四',
    email: 'user2@world.com',
    phone: '94934567',
    experience: 2,
    intro: '我是张三，这是一份个人介绍',
    leetCodeUrl: 'https://leetcode.com',
    thirdPersonIntro: '这是张三，很完美的第三人称介绍',
    referLinks: 'http://google.com',
    status: 'processing',
    updatedOn: dayjs().add(-10, 'day'),
    resumeId: 'resume-2',
    jobId: 'job-1',
    refererId: 'user-1',
    refereeId: 'user-2'
  }
]

export const resumes = [
  {
    resumeId: 'resume-2',
    name: '李四的简历.pdf',
    url: 'https://user-2.pdf',
    refereeId: 'user-2',
    referId: null
  }
]
