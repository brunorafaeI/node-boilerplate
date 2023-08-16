import dotenv from 'dotenv'
import fs from 'node:fs'

import { getEnv } from '@/common/libs/dotenv'
import { checkEnvFile } from '@/infra/config/environment'

describe('stringUtil', () => {
  it('should not call dotenv.config when the file does not exist', () => {
    const envPath = 'valid/path/to/nonexistent/env/file'
    const configSpy = vi.spyOn(dotenv, 'config').mockImplementation(() => ({}))

    checkEnvFile(envPath)
    expect(configSpy).not.toHaveBeenCalled()
  })

  it('should call dotenv.config with the provided envPath when the file exists', () => {
    const envPath = 'valid/path/to/env/file'
    const configSpy = vi.spyOn(dotenv, 'config').mockImplementation(() => ({}))

    vi.spyOn(fs, 'existsSync').mockReturnValue(true)

    checkEnvFile(envPath)
    expect(configSpy).toHaveBeenCalledWith({ path: envPath })
  })

  it('should not throw an error when an invalid envPath is provided', () => {
    const envPath = 'invalid/path/to/env/file'
    vi.spyOn(fs, 'existsSync').mockReturnValue(false)

    expect(() => checkEnvFile(envPath)).not.toThrow()
  })

  it('should not throw an error when envPath is null or undefined', () => {
    const envPath = null

    expect(() => checkEnvFile(envPath)).not.toThrow()
  })

  it('should returns the NODE_ENV environment variable equal to "development"', () => {
    vi.stubGlobal('process', {
      ...process,
      env: {
        ...process.env,
        NODE_ENV: 'development',
      },
    })

    expect(getEnv('NODE_ENV')).toBe('development')
  })
})
