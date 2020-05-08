type TJob = {
  jobId: string
  refererId: string
  company: string
  requiredFields: string[]
  deadline: string
  autoRejectDay: 3 | 5 | 7
  appliedCount: number
  applyTotal: number
  source?: string
  createdAt: string
  updatedAt: string
  logs: TLog[]
  referer: TUser
}

type TLog = {
  date: string
  count: number
}

type TJobForm = TMapper & {
  company: string
  requiredFields: string[]
  deadline: string
  autoRejectDay: 3 | 5 | 7
  applyTotal: number
  source: string
}
