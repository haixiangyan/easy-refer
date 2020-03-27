import {ELEMENT_COLORS} from '@/contents/color'

export const getReferProgress = (percentage: number): string => {
  if (0 <= percentage && percentage < 30) {
    return ELEMENT_COLORS.success
  } else if (30 <= percentage && percentage < 60) {
    return ELEMENT_COLORS.warning
  } else {
    return ELEMENT_COLORS.danger
  }
}
