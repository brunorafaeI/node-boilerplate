import { describe, test, expect } from 'vitest'
import { StringUtil } from '@/common/utils'

describe('StringUtil toBoolean', () => {
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

describe('StringUtil toFloat', () => {
  // Tests that the function returns a floating-point number when given a valid number as input
  it('should return a floating-point number when given a valid number as input', () => {
    const result = StringUtil.toFloat(5)
    expect(typeof result).toBe('number')
  })

  // Tests that the function returns a floating-point number when given a valid string representation of a number as input
  it('should return a floating-point number when given a valid string representation of a number as input', () => {
    const result = StringUtil.toFloat('3.14')
    expect(typeof result).toBe('number')
  })

  // Tests that the function returns undefined when given undefined as input
  it('should return undefined when given undefined as input', () => {
    const result = StringUtil.toFloat(undefined)
    expect(result).toBeUndefined()
  })

  // Tests that the function returns undefined when given null as input
  it('should return undefined when given null as input', () => {
    const result = StringUtil.toFloat(null)
    expect(result).toBeUndefined()
  })

  // Tests that the function returns undefined when given an empty string as input
  it('should return undefined when given an empty string as input', () => {
    const result = StringUtil.toFloat('')
    expect(result).toBeUndefined()
  })

  // Tests that the function returns undefined when given a non-numeric string as input
  it('should return undefined when given a non-numeric string as input', () => {
    const result = StringUtil.toFloat('abc')
    expect(result).toBeUndefined()
  })
})

describe('StringUtil toString', () => {
  // Tests that the function returns the input string if it is of type string.
  it('should return the input string when it is of type string', () => {
    const input = 'hello'
    const result = StringUtil.toString(input)
    expect(result).toBe(input)
  })

  // Tests that the function returns undefined if the input is not of type string.
  it('should return undefined when the input is not of type string', () => {
    const input = 123
    const result = StringUtil.toString(input)
    expect(result).toBeUndefined()
  })

  // Tests that the function returns undefined if the input is null.
  it('should return undefined when the input is null', () => {
    const input = null
    const result = StringUtil.toString(input)
    expect(result).toBeUndefined()
  })

  // Tests that the function returns undefined if the input is undefined.
  it('should return undefined when the input is undefined', () => {
    const input = undefined
    const result = StringUtil.toString(input)
    expect(result).toBeUndefined()
  })

  // Tests that the function returns undefined if the input is a number.
  it('should return undefined when the input is a number', () => {
    const input = 123
    const result = StringUtil.toString(input)
    expect(result).toBeUndefined()
  })

  // Tests that the function returns undefined if the input is a boolean.
  it('should return undefined when the input is a boolean', () => {
    const input = true
    const result = StringUtil.toString(input)
    expect(result).toBeUndefined()
  })
})
