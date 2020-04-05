export const REFER_FIELDS_MAPPER: TStringMapper = {
  name: '姓名',
  email: '邮箱',
  phone: '电话',
  experience: '工作经验',
  resumeUrl: '个人简历',
  intro: '个人简介',
  thirdPersonIntro: '第三人称介绍',
  leetCodeUrl: 'LeetCode链接',
  referLinks: '内推链接',
}

export const getFieldName = (value: string) => REFER_FIELDS_MAPPER[value]

export const REQUIRED_REFER_FIELD_VALUES = [
  'name', 'email', 'experience', 'referLinks'
]
