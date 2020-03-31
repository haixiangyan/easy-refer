type TMapper = {
  [key: string]: string
}
type TNumMapper = {
  [key: number]: string
}

type TItem = {
  value: string
  label: string
}

type TLoginForm = {
  email: string
  password: string
}

type TRegisterForm = TLoginForm & { }

type TJobItem = {
  jobId: string
  refererName: string
  company: string
  referredCount: number
  referTotal: number
  deadline: string
  expiration: 3 | 5 | 7
  imageUrl?: string
  source?: string
}
type TJobInResume = TJobItem & {
  requiredFields: string[]
}
type TJobForm = {
  jobId?: string
  refererId: string,
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

type TReferItem = {
  referId: string
  jobId: string
  status: string
  updatedAt: string
  company: string
  refererName: string
  source?: string
}
type TReferRow = {
  referId: string
  jobId: string
  resumeId: string
  experience: number
  name: string
  createdAt: string
}

type TUser = {
  userId: string
  jobId: string
  email: string
  name: string
  experience: number
  intro?: string
  phone?: string
  leetCodeUrl?: string
  thirdPersonIntro?: string
  resumeUrl?: string
}

type TResumeForm = {
  refereeId: string
  jobId: string
  email: string
  name: string
  experience: number
  intro: string
  leetCodeUrl: string
  phone: string
  referLinks: string
  resumeUrl: string
  thirdPersonIntro: string
}

type TResumeDetails = TResumeForm & {
  resumeId: string
}

type TIntro = {
  avatarUrl: string
  name: string
  finishedRefers: number
  totalRefers: number
  finishedResumes: number
  totalResumes: number
}

