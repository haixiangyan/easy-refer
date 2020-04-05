interface IUploadResume {
  resumeId: string
  url: string
  name: string
}

interface IAvatar {
  avatarUrl: string
}

type TLoginForm = {
  email: string
  password: string
}

interface IUser extends TUser {}

interface ILogin {
  user: TUser
  job?: TJob
  resume?: TResume
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
