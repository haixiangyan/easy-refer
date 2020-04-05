import {getReferProgress} from '@/utils/refer'
import {ELEMENT_COLORS} from '@/constants/color'

describe('getReferProgress', () => {
  it('可以返回对应百分比的进度条颜色', () => {
    const successPercentage = 20
    const warningPercentage = 40
    const dangerPercentage = 90

    expect(getReferProgress(successPercentage)).toEqual(ELEMENT_COLORS.success)
    expect(getReferProgress(warningPercentage)).toEqual(ELEMENT_COLORS.warning)
    expect(getReferProgress(dangerPercentage)).toEqual(ELEMENT_COLORS.danger)
  })
  it('当非法百分比的时候，返回 info 颜色', () => {
    const invalidPercentage = -1

    expect(getReferProgress(invalidPercentage)).toEqual(ELEMENT_COLORS.info)
  })
})
