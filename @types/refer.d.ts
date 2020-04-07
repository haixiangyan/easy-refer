type TRole = 'referer' | 'referee'
type TViewRole = 'my' | 'other'
type TStatus = 'processing' | 'referred' | 'rejected'

type TReferForm = TMapper & {
  name: string
  email: string
  phone: string
  experience: number
  intro: string
  leetCodeUrl: string
  thirdPersonIntro: string
  resumeId: string
  referLinks: string
}

type TReferPatch = {
  referId?: string
  jobId?: string
  refererId?: string
  refereeId?: string
  name?: string
  email?: string
  phone?: string
  experience?: number
  intro?: string
  leetCodeUrl?: string
  thirdPersonIntro?: string
  resumeId?: string
  referLinks?: string
  status?: TStatus
  updatedAt?: string
  createdAt?: string
}

type TRefer = TMapper & {
  referId: string
  jobId: string
  refererId: string
  refereeId: string
  name: string
  email: string
  phone: string
  experience: number
  intro: string
  leetCodeUrl: string
  thirdPersonIntro: string
  resumeId: string
  referLinks: string
  status: TStatus
  updatedAt: string
  createdAt: string
}

// 查看 Refer 状态的 Item，以后需要扩展
type TMyRefer = {
  referId: string
  referer: {
    name: string
  }
  job: {
    jobId: string
    company: string
  }
  status: string
  updatedAt: string
  source: string
}

// Refer 表中的一行，以后需要扩展
type TOtherRefer = {
  referId: string
  resume: {
    resumeId: string
    url: string
    name: string
  }
  job: {
    jobId: string
  }
  referer: {
    name: string
  }
  referee: {
    name: string
  }
  experience: number
  createdAt: string
}
