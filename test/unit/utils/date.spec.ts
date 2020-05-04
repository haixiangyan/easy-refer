import dayjs from 'dayjs'
import {dateLeft} from '~/utils/date'

describe('dateLeft', () => {
  it('年', () => {
    const date = dayjs().add(2, 'year').add(3, 'month').toISOString()

    const left = dateLeft(date)

    expect(left).toEqual('还剩2年')
  })
  it('月', () => {
    const date = dayjs().add(2, 'month').add(3, 'day').toISOString()

    const left = dateLeft(date)

    expect(left).toEqual('还剩2月')
  })
  it('周', () => {
    const date = dayjs().add(2, 'week').add(1, 'day').toISOString()

    const left = dateLeft(date)

    expect(left).toEqual('还剩2周')
  })
  it('天', () => {
    const date = dayjs().add(2, 'day').toISOString()

    const left = dateLeft(date)

    expect(left).toEqual('还剩2天')
  })
  it('负数情况', () => {
    const date = dayjs().subtract(1, 'month').toISOString()

    const left = dateLeft(date)

    expect(left).toEqual('还剩0天')
  })
})
