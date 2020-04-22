type TUser = {
  userId: string
  jobId: string
  email: string
  name: string
  experience: number
  intro: string
  phone: string
  leetCodeUrl: string
  thirdPersonIntro: string
  resumeId: string
  avatarUrl: string
  myReferTotal: number,
  processedMyReferCount: number,
  otherReferTotal: number,
  processedOtherReferCount: number
}

type TUserForm = TMapper & {
  email: string
  name: string
  experience: number
  intro: string
  phone: string
  leetCodeUrl: string
  thirdPersonIntro: string
  avatarUrl: string
}
