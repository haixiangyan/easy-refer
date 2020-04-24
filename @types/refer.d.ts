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
  updatedOn: Date
  updatedAt: Date
  createdAt: Date
  job: TJob
  referer: TUser
  referee: TUser
}
