import {getFieldName, REFER_FIELDS_MAPPER} from '@/constants/referFields'

describe('getFieldName', () => {
  it('能匹配对应的表单字段', () => {
    Object.keys(REFER_FIELDS_MAPPER).forEach((key: string) => {
      expect(getFieldName(key)).toEqual(REFER_FIELDS_MAPPER[key])
    })
  })
  it('当输入非法值时，抛出错误', () => {
    expect(() => getFieldName('hello')).toThrowError()
  })
})
