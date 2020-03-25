interface IData {
  success: boolean
  message: string
  content?: any
}

interface ILoginResponseData extends IData{ }
interface IRegisterResponseData extends IData {
  content: TLoginForm
}

interface IJobsResponseData extends IData {
  content: {
    totalPages: number
    jobs: TJob[]
  }
}

type TLoginForm = {
  email: string
  password: string
}

type TRegisterForm = TLoginForm & { }

type TJob = {
  id: string,
  imageUrl: string,
  title: string
  content: string
  company: string
}
