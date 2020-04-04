type TStringMapper = {
  [key: string]: string
}
type TNumMapper = {
  [key: number]: string
}
type TELTableItem = {
  key: string
  value: string
}

type TLoginForm = {
  email: string
  password: string
}

interface ILogin extends TUser{ }
interface IRegister { }
