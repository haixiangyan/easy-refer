import Mock from 'mockjs'
import dayjs from 'dayjs'

const expiration = [3, 5, 7]
const companies = ['Facebook', 'Google', 'Linkedin', 'Amazon', 'Databricks', 'BrixLabs']
const status = ['processing', 'rejected', 'referred']
const requiredFields = ['name', 'email', 'phone', 'experience', 'referLinks', 'resumeUrl', 'intro', 'thirdPersonIntro', 'leetCodeUrl']

const mockArray = (array: any[]) => array[Mock.Random.integer(array.length - 1)]
const mockItemList = (length: number, makeObjectCallback: Function) => [...Array(length)].map(() => makeObjectCallback())
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
  resumeUrl: '@URL',
  avatarUrl: '@URL'
}
