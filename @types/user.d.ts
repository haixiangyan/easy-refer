type TUser = {
  userId: string
  jobId: string
  email: string
  name?: string
  experience: number
  intro?: string
  phone?: string
  leetCodeUrl?: string
  thirdPersonIntro?: string
}

type TUserForm = TMapper & {
  email: string
  name: string
  experience: number
  intro: string
  phone: string
  leetCodeUrl: string
  thirdPersonIntro: string
}
