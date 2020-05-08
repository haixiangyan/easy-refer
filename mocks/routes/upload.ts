import express from 'express'
import Mock from 'mockjs'

const UploadRouter = express.Router()

UploadRouter.post('/resume', (req, res) => {
  res.json(Mock.mock({
    resumeId: '@ID',
    url: '@URL',
    name: '@URL',
  }))
})

export default UploadRouter
