interface IData {
  success: boolean
  message: string
  content?: any
}

interface ILogin extends IData{
  content: TUser
}
interface IRegister extends IData {
  content: TLoginForm
}

interface IIntro extends IData {
  content: TIntro
}
interface IUser extends IData {
  content: TUser
}

interface IGetJobs extends IData {
  content: {
    totalPages: number
    jobs: TJob[]
  }
}
interface IGetJob extends IData {
  content: TJob
}
interface IAddJob extends IData {
  content: TJob
}

interface IGetResumes extends IData {
  content: {
    totalPages: number
    resumes: TResume[]
  }
}
interface IApply extends IData {
  content: TApplication
}

interface IGetRefers extends IData {
  content: {
    totalPages: number
    refers: TRefer[]
  }
}

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
  company: string
  referer: string
  requiredFields: string[]
  deadline: Date
  expiration: 3 | 5 | 7
  referredCount: number
  referTotal: number
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
  applicationId: string
  jobId: string
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
