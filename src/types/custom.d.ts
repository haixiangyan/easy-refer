interface IData {
  success: boolean
  message: string
  content?: any
}

interface ILogin extends IData{
  content: {
    userId: string
    email: string
    name: string
  }
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
interface IAddJob extends IData {
  content: TJob
}

interface IGetResumes extends IData {
  content: {
    totalPages: number
    resumes: TResume[]
  }
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
  id: string,
  tags: TTag[]
  company: string
  referer: string
  requiredFields: string[]
  deadline: Date,
  expiration: 3 | 5 | 7
  limit: number
  imageUrl?: string,
  source?: string
}

type TRefer = TJob & {
  status: string
  updatedDate: string
}

type TUser = {
  email: string
  name: string
  experience: number
  intro?: string
  phone?: string
  leetCodeUrl?: string
  thirdPersonIntro?: string
  resumeUrl?: string
}

type TApplication = TRefer & TUser & {
  referLinks: string[]
}

type TTag = {
  type: 'success' | 'danger' | 'warning' | 'info' | 'primary'
  text: string
}

type TResume = {
  id: string
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
