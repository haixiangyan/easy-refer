type TStringMapper = {
  [key: string]: string
}
type TNumMapper = {
  [key: number]: string
}
type TMapper = {
  [key: string]: string | number
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

interface IJobItemList {
  jobItemList: TJobItem[]
  totalPages: number
}

interface IReferList {
  referList: TMyRefer[] | TOtherRefer[]
  totalPages: number
}

interface IRefer extends TRefer{ }

interface IResume extends TResume { }
