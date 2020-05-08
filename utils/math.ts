import {ELEMENT_COLORS} from '@/constants/color'

export const getProgressColor = (percentage: number): string => {
  if (0 <= percentage && percentage <= 30) {
    return ELEMENT_COLORS.success
  } else if (30 < percentage && percentage < 60) {
    return ELEMENT_COLORS.warning
  } else if (60 <= percentage && percentage <= 100) {
    return ELEMENT_COLORS.danger
  } else {
    return ELEMENT_COLORS.info
  }
}

export const getRatio = (numerator: number, denominator: number): number => {
  return denominator === 0 ?
          0.00 :
          parseFloat((numerator / denominator * 100).toFixed(2))
}
