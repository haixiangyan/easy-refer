type TJob = {
  jobId: string
  refererId: string
  company: string
  requiredFields: string[]
  deadline: string
  autoRejectDay: 3 | 5 | 7
  referredCount: number
  referTotal: number
  source?: string
  createdAt: string
  updatedAt: string
  processedChart: TProcessedChartItem[]
  referer: TUser
}

type TProcessedChartItem = {
  date: string
  count: number
}

type TJobForm = TMapper & {
  company: string
  requiredFields: string[]
  deadline: string
  autoRejectDay: 3 | 5 | 7
  referTotal: number
  source: string
}
