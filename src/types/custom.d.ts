type TStringMapper = {
  [key: string]: string
}
type TNumMapper = {
  [key: number]: string
}
type TMapper = {
  [key: string]: string | number | string[]
}
type TELTableItem = {
  key: string
  value: string
}

type TLoginForm = {
  email: string
  password: string
}

interface ILogin {
  user: TUser
  job: TJob
}

interface IRegister {}

interface IJob extends TJob {}

interface IJobItem extends TJobItem {}

interface IJobItemList {
  jobItemList: TJobItem[]
  totalPages: number
}

interface IReferList {
  referList: TMyRefer[] | TOtherRefer[]
  totalPages: number
}

interface IRefer extends TRefer {}

interface IResume extends TResume {}
