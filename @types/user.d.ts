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
  approvedMyReferCount: number,
  otherReferTotal: number,
  approvedOtherReferCount: number
}

type TUserForm = TMapper & {
  email: string
  name: string
  experience: number
  intro: string
  phone: string
  leetCodeUrl: string
  thirdPersonIntro: string
  resumeId: string
  avatarUrl: string
}
