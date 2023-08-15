import { describe, test, expect } from 'vitest'
import { StringUtil } from '@/common/utils'

describe('StringUtil', () => {
  test('should return true for boolean value', () => {
    const result = StringUtil.toBoolean(true)
    expect(result).toBe(true)
  })

  test('should return true for string value "true"', () => {
    const result = StringUtil.toBoolean('true')
    expect(result).toBe(true)
  })

  test('should return false for string value "false"', () => {
    const result = StringUtil.toBoolean('false')
    expect(result).toBe(false)
  })

  test('should return true for any non-undefined value', () => {
    const result = StringUtil.toBoolean(42)
    expect(result).toBe(true)
  })

  test('should return false for undefined value', () => {
    const result = StringUtil.toBoolean(undefined)
    expect(result).toBe(false)
  })
})
