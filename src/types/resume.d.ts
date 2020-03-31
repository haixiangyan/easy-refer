type TResumeForm = {
  refereeId: string
  jobId: string
  email: string
  name: string
  experience: number
  intro: string
  leetCodeUrl: string
  phone: string
  referLinks: string
  resumeUrl: string
  thirdPersonIntro: string
}

type TResumeDetails = TResumeForm & {
  resumeId: string
}
