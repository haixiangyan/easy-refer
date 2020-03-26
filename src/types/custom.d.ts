interface IData {
  success: boolean
  message: string
  content?: any
}

interface ILoginResponseData extends IData{ }
interface IRegisterResponseData extends IData {
  content: TLoginForm
}

interface IIntroResponseData extends IData {
  content: TIntro
}
interface IUserResponseData extends IData {
  content: TUser
}

interface IJobsResponseData extends IData {
  content: {
    totalPages: number
    jobs: TJob[]
  }
}

interface IResumesResponseData extends IData {
  content: {
    totalPages: number
    resumes: TResume[]
  }
}

interface IRefersResponseData extends IData {
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
  imageUrl?: string,
  source?: string
}

type TRefer = TJob & {
  status: string
  updatedDate: string
}

type TApplication = TRefer & TUser & {
  referLinks: string[]
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
