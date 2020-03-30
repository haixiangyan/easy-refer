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
}

type TRefer = TJob & {
  referId: string
  status: string
  updatedDate: string
}

type TUser = {
  userId: string
  email: string
  name: string
  experience: number
  jobId?: string
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
