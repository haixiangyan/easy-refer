import express from 'express'
import Mock from 'mockjs'

// '/resumes'
const ResumesRouter = express.Router()

// 获取一个 Resume
ResumesRouter.get('/', (req, res) => {
  res.json(Mock.mock({
    resumeId: '@ID',
    url: '@URL',
    name: '@URl'
  }))
})

export default ResumesRouter
