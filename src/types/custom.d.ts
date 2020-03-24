interface IData {
  success: boolean
  message: string
  content?: any
}

interface ILoginResponseData extends IData{ }
interface IRegisterResponseData extends IData {
  content: LoginForm
}

type LoginForm = {
  email: string
  password: string
}

type RegisterForm = LoginForm & { }
