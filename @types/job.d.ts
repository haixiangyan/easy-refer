type TJob = {
  jobId: string
  refererId: string
  company: string
  requiredFields: string[]
  deadline: string
  expiration: 3 | 5 | 7
  referredCount: number
  referTotal: number
  source: string
  createdAt: string
  updatedAt: string
  processedChart: TProcessedChartItem[]
}

type TJobItem = {
  jobId: string
  referer: {
    name: string
    avatarUrl: string
  }
  company: string
  referredCount: number
  referTotal: number
  deadline: string
  expiration: 3 | 5 | 7
  requiredFields: string[]
  source: string,
  processedChart: TProcessedChartItem[]
}

type TProcessedChartItem = {
  date: string
  count: number
}

type TJobForm = TMapper & {
  company: string
  requiredFields: string[]
  deadline: string
  expiration: 3 | 5 | 7
  referTotal: number
  source: string
  createdAt: string
  updatedAt: string
}
