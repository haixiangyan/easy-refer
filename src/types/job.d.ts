type TJob = {
  jobId?: string
  refererId?: string
  company?: string
  requiredFields?: string[]
  deadline?: string
  expiration?: 3 | 5 | 7
  referredCount?: number
  referTotal?: number
  imageUrl?: string
  source?: string
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
  source: string
}

type TJobForm = {
  refererName: string,
  company: string
  requiredFields: string[]
  deadline: string
  expiration: 3 | 5 | 7
  referredCount: number
  referTotal: number
  createdAt: string
  imageUrl?: string
  source?: string
}
