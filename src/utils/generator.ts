export const getLevel = (experience: number): string => {
  return experience === 0 ? '应届生' : `${experience}年工作经验`
}
