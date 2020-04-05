import dayjs from 'dayjs'
import faker from "faker/locale/zh_CN"

const expiration = [3, 5, 7]
const companies = ['Facebook', 'Google', 'Linkedin', 'Amazon', 'Databricks', 'BrixLabs']
const status = ['processing', 'rejected', 'referred']
const requiredFields = ['name', 'email', 'phone', 'experience', 'referLinks', 'resumeUrl', 'intro', 'thirdPersonIntro', 'leetCodeUrl']

const dateRange = (from: string, to: string) => dayjs(faker.date.between(from, to)).toISOString()
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
  resumeId:'@ID',
  avatarUrl: `@DATAIMAGE('100x100', '用户')`,
  finishedRefers: '@NATURAL(10, 100)',
  totalRefers: '@NATURAL(100, 300)',
  finishedResumes: '@NATURAL(10, 100)',
  totalResumes: '@NATURAL(100, 300)',
}

export const Resume = {
  resumeId: '@ID',
  url: '@URL',
  name: '@URL'
}

export const Job = {
  jobId: '@ID',
  refererId: '@ID',
  'company|1': companies,
  requiredFields,
  deadline: dateRange('2020-12-1', '2021-1-1'),
  'expiration|1': expiration,
  referredCount: '@NATURAL(30, 100)',
  referTotal: '@NATURAL(100, 300)',
  source: '@URL',
  createdAt: dateRange('2020-12-1', '2021-1-1'),
  updatedAt: dateRange('2020-12-1', '2021-1-1')
}

export const JobItem = {
  jobId: '@ID',
  referer: {
    name: '@CNAME',
    avatarUrl: `@DATAIMAGE('100x100', '内推人')`,
  },
  'company|1': companies,
  referredCount: '@INTEGER(30, 100)',
  referTotal: '@INTEGER(100, 300)',
  deadline: dateRange('2020-12-1', '2021-1-1'),
  'expiration|1': expiration,
  requiredFields,
  source: '@URL',
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
  resumeId:'@ID',
  'status|1': status,
  updatedAt: dateRange('2020-4-1', '2020-5-1'),
  createdAt: now()
}

// 查看 Refer 状态的 Item，以后需要扩展
export const MyRefer = {
  referId: '@ID',
  referer: {
    name: '@CNAME',
  },
  job: {
    jobId: '@ID',
    'company|1': companies
  },
  'status|1': status,
  updatedAt: dateRange('2020-4-1', '2020-5-1'),
  source: '@URL'
}

// Refer 表中的一行，以后需要扩展
export const OtherRefer = {
  referId: '@ID',
  resume: {
    resumeId: '@ID',
    url: '@URL',
    name: '@CNAME'
  },
  job: {
    jobId: '@ID'
  },
  referer: {
    name: '@CNAME'
  },
  referee: {
    name: '@CNAME'
  },
  experience: '@NATURAL(0, 7)',
  createdAt: now()
}
