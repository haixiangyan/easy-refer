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

type TJob = {
  jobId: string,
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
  // meta
  refererName: string
}

type TRefer = {
  referId: string
  refereeId: string
  refererId: string
  jobId: string
  resumeId: string
  status: string
  updatedAt: string
  // meta
  company: string
  refererName: string
  source?: string
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

type TApplication = TUser & {
  resumeId: string
  jobId: string
  createdAt: string
  referLinks?: string
}

type TResume = {
  resumeId: string
  name: string
  createdAt: string
  experience: number
}

type TIntro = {
  avatarUrl: string
  name: string
  finishedRefers: number
  totalRefers: number
  finishedResumes: number
  totalResumes: number
}
