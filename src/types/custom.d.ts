interface IData {
  success: boolean
  message: string
  content?: any
}

interface ILoginData extends IData{ }

type LoginForm = {
  email: string
  password: string
}
