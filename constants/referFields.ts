export const REFER_FIELDS_MAPPER: TStringMapper = {
  name: '姓名',
  email: '邮箱',
  phone: '电话',
  experience: '工作经验',
  resumeId: '个人简历',
  intro: '个人简介',
  thirdPersonIntro: '第三人称介绍',
  leetCodeUrl: 'LeetCode链接',
  referLinks: '内推链接',
}

export const getFieldName = (key: string) => {
  if (!REFER_FIELDS_MAPPER[key]) {
    throw new Error(`字段 ${key} 不存在于表单中`)
  }
  return REFER_FIELDS_MAPPER[key]
}

export const REQUIRED_REFER_FIELD_VALUES = [
  'name', 'email', 'experience', 'referLinks'
]
