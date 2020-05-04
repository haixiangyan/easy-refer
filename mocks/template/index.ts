import dayjs from 'dayjs'
import Mock from 'mockjs'

const autoRejectDay = [3, 5, 7]
const companies = ['Facebook', 'Google', 'Linkedin', 'Amazon', 'Databricks', 'BrixLabs']
const status = ['processing', 'rejected', 'referred']
const requiredFields = ['name', 'email', 'phone', 'experience', 'referLinks', 'resumeId', 'intro', 'thirdPersonIntro', 'leetCodeUrl']

const dateRange = () => dayjs(Mock.Random.date()).toISOString()
const now = () => dayjs().toISOString()

export const User = {
  userId: '@ID',
  jobId: '@ID',
  email: '@EMAIL',
  name: '@CNAME',
  experience: '@NATURAL(0, 7)',
  intro: '@PARAGRAPH',
  phone: '949346789',
  leetCodeUrl: '@URL',
  thirdPersonIntro: '@PARAGRAPH',
  resumeId: '@ID',
  avatarUrl: `@IMAGE('100x100', '#ffbbaa', 'Avatar')`
}

export const Resume = {
  resumeId: '@ID',
  url: '@URL',
  name: '@URL'
}

export const Job = {
  jobId: '@ID',
  refererId: '@ID',
  referer: User,
  'company|1': companies,
  requiredFields,
  deadline: dayjs().add(10, 'month').toISOString(),
  'autoRejectDay|1': autoRejectDay,
  referredCount: '@NATURAL(30, 100)',
  referTotal: '@NATURAL(100, 300)',
  source: '@URL',
  createdAt: dayjs().subtract(10, 'day').toISOString(),
  updatedAt: dayjs().add(4, 'month').toISOString(),
  'processedChart|12': [{
    date: `@DATE('yyyy-MM-dd')`,
    count: '@NATURAL(50, 100)'
  }]
}

export const Refer = {
  referId: '@ID',
  jobId: '@ID',
  refererId: '@ID',
  refereeId: '@ID',
  name: '@CNAME',
  email: '@EMAIL',
  phone: '949346789',
  experience: '@NATURAL(0, 7)',
  intro: '@PARAGRAPH',
  leetCodeUrl: '@URL',
  thirdPersonIntro: '@PARAGRAPH',
  referLinks: '@URL',
  resumeId: '@ID',
  'status|1': status,
  updatedOn: dateRange(),
  updatedAt: dateRange(),
  createdAt: now(),
  job: Job,
  referer: User,
  referee: User,
  resume: Resume
}
