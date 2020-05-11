interface IUploadResume {
  resumeId: string
  url: string
  name: string
}

type TLoginForm = {
  email: string
  password: string
}

type TRegistrationForm = {
  email: string
  password: string
  confirmPassword: string
}

type TActivationForm = {
  email: string
  password: string
}
