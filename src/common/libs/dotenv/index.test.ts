import { describe, expect, it } from 'vitest'
import { getEnv } from '@/common/libs/dotenv'

describe('getEnv', () => {
  it('should return the value of the environment variable when it exists', () => {
    process.env.TEST_KEY = 'test_value'
    expect(getEnv('TEST_KEY', 'fallback')).toEqual('test_value')
  })

  it('should return the fallback value when the environment variable does not exist', () => {
    expect(getEnv('NON_EXISTENT_KEY', 'fallback')).toEqual('fallback')
  })

  it('should return fallback when the environment variable is an empty string', () => {
    process.env.TEST_KEY = ''
    expect(getEnv('TEST_KEY', 'fallback')).toEqual('fallback')
  })

  it('should return the fallback value when the environment variable is undefined', () => {
    expect(getEnv(undefined, 'fallback')).toEqual('fallback')
  })

  it('should return the fallback value when the environment variable is null', () => {
    expect(getEnv(null, 'fallback')).toEqual('fallback')
  })
})
