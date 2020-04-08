import express from 'express'
import Mock from 'mockjs'
import {JobItem} from '../mocks/MockObject'

// '/jobs'
const JobsRouter = express.Router()

JobsRouter.get('/item', ((req, res) => {
  res.json(Mock.mock({
    'jobItemList|10': [JobItem],
    totalPages: 100
  }))
}))


export default JobsRouter
