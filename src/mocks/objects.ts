import Mock from 'mockjs'
import dayjs from 'dayjs'
import faker from "faker/locale/zh_CN"

const expiration = [3, 5, 7]
const companies = ['Facebook', 'Google', 'Linkedin', 'Amazon', 'Databricks', 'BrixLabs']
const status = ['processing', 'rejected', 'referred']
const requiredFields = ['name', 'email', 'phone', 'experience', 'referLinks', 'resumeUrl', 'intro', 'thirdPersonIntro', 'leetCodeUrl']

const mockArray = (array: any[]) => array[Mock.Random.integer(array.length - 1)]
const dateRange = (from: string, to: string) => dayjs(faker.date.between(from, to)).toISOString()
const now = () => dayjs().toISOString()

export const User = {
  userId: '@ID',
  jobId: '@ID',
  email: '@EMAIL',
  name: '@CNAMW',
  experience: mockArray(expiration),
  intro: '@PARAGRAPH',
  phone: '949346789',
  leetCodeUrl: '@URL',
  thirdPersonIntro: '@PARAGRAPH',
  resumeId:'@ID',
  avatarUrl: '@URL'
}

export const Resume = {
  resumeId: '@ID',
  url: '@URL',
  name: '@URL'
}

export const Job = {
  jobId: '@ID',
  refererId: '@ID',
  company: mockArray(companies),
  requiredFields,
  deadline: dateRange('2020-12-1', '2021-1-1'),
  expiration: mockArray(expiration),
  referredCount: '@INTEGER(30, 100)',
  referTotal: '@INTEGER(100, 300)',
  source: '@URL'
}

export const Refer = {
  referId: '@ID',
  jobId: '@ID',
  refererId: '@ID',
  refereeId: '@ID',
  name: '@CNAMW',
  email: '@EMAIL',
  phone: '949346789',
  experience: mockArray(expiration),
  intro: '@PARAGRAPH',
  leetCodeUrl: '@URL',
  thirdPersonIntro: '@PARAGRAPH',
  resumeId:'@ID',
  status: mockArray(status),
  updatedAt: dateRange('2020-4-1', '2020-5-1'),
  createdAt: now()
}
