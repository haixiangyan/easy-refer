export const JOB_RULES = {
  company: [
    {required: true, message: '请输入公司名', trigger: 'blur'},
  ],
  deadline: [
    {required: true}
  ],
  autoRejectDay: [
    {required: true}
  ],
  applyTotal: [
    {required: true}
  ],
  requiredFields: [
    {required: true}
  ]
}

export const LOGIN_RULES = {
  email: [
    {required: true, message: '请输入邮箱', trigger: 'blur'},
    {type: 'email', message: '邮箱格式不正确', trigger: 'blur'}
  ],
  password: [
    {required: true, message: '请输入密码', trigger: 'blur'},
    {type: 'string', min: 6, message: '密码至少6位以上', trigger: 'blur'}
  ]
}

export const RESUME_RULES = {
  email: [
    {required: true, message: '请输入邮箱', trigger: 'blur'},
    {type: 'email', message: '邮箱格式不正确', trigger: 'blur'}
  ],
  phone: [
    {required: true, message: "请输入姓名", trigger: "blur"},
    {pattern: /[\d\-]{9,11}/, message: '电话格式不正确', trigger: 'blur'}
  ]
}

export const REGISTER_RULES = {
  email: [
    {required: true, message: '请输入邮箱', trigger: 'blur'},
    {type: 'email', message: '邮箱格式不正确', trigger: 'blur'}
  ],
  password: [
    {required: true, message: '请输入密码', trigger: 'blur'},
    {type: 'string', min: 6, message: '密码至少6位以上', trigger: 'blur'}
  ]
}

export const EDIT_USER_RULES = {
  email: [
    {required: true, message: '请输入邮箱', trigger: 'blur'},
    {type: 'email', message: '邮箱格式不正确', trigger: 'blur'}
  ],
  phone: [
    {required: false, message: "请输入姓名", trigger: "blur"},
    {pattern: /[\d\-]{9,11}/, message: '电话格式不正确', trigger: 'blur'}
  ],
}
