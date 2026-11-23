import { formatCount } from '../src/utils/formatCount'

describe('formatCount', () => {
  it('keeps small numbers as they are', () => {
    expect(formatCount(950)).toBe('950')
  })

  it('shortens thousands', () => {
    expect(formatCount(12_340)).toBe('12.3k')
  })

  it('shortens millions', () => {
    expect(formatCount(2_500_000)).toBe('2.5M')
  })
})
