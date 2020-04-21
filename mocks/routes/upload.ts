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

UploadRouter.post('/avatar', (req, res) => {
  res.json(Mock.mock({
    avatarUrl: Mock.Random.image('100x100', '#fff')
  }))
})

export default UploadRouter
