import express from 'express'
import Mock from 'mockjs'

const UploadRouter = express.Router()

UploadRouter.post('/resume', (req, res) => {
  res.json(Mock.mock({
    resumeId: '@ID',
    resumeUrl: '@URL',
    resumeName: '@URL',
  }))
})

UploadRouter.post('/avatar', (req, res) => {
  res.json(Mock.mock({
    avatarUrl: Mock.Random.image('100x100', '#fff')
  }))
})
