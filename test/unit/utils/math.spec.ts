import {getProgressColor, getRatio} from '~/utils/math'
import {ELEMENT_COLORS} from '@/constants/color'

describe('getReferColor', () => {
  it('可以返回对应百分比的进度条颜色', () => {
    const successPercentage = 20
    const warningPercentage = 40
    const dangerPercentage = 90

    expect(getProgressColor(successPercentage)).toEqual(ELEMENT_COLORS.success)
    expect(getProgressColor(warningPercentage)).toEqual(ELEMENT_COLORS.warning)
    expect(getProgressColor(dangerPercentage)).toEqual(ELEMENT_COLORS.danger)
  })
  it('当非法百分比的时候，返回 info 颜色', () => {
    const invalidPercentage = -1

    expect(getProgressColor(invalidPercentage)).toEqual(ELEMENT_COLORS.info)
  })
})

describe('getRatio', () => {
  it('正常计算比率', () => {
    const ratio = getRatio(1, 2)

    expect(ratio).toEqual(50)
  })
  it('计算0比率', () => {
    const ratio = getRatio(1, 0)

    expect(ratio).toEqual(0.0)
  })
})
