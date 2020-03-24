interface IData {
  success: boolean
  message: string
  content?: any
}

interface ILoginResponseData extends IData{ }
interface IRegisterResponseData extends IData {
  content: LoginForm
}

interface IJobsResponseData extends IData {
  content: Job[]
}

type LoginForm = {
  email: string
  password: string
}

type RegisterForm = LoginForm & { }

type Job = {
  id: string,
  imageUrl: string,
  title: string
  content: string
  company: string
}
