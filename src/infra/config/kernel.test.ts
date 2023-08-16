import { KERNEL, projectDirFromPlatform } from '@/infra/config/kernel'
import { join } from 'path'

describe('KERNEL', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should have a project_dir property', () => {
    expect(KERNEL).toHaveProperty('project_dir')
  })
})

describe('projectDirFromPlatform', () => {
  it('should return the correct path when the process platform is "win32"', () => {
    vi.stubGlobal('process', {
      ...process,
      platform: 'win32',
    })

    const result = projectDirFromPlatform()
    expect(result).toBe(join(__dirname, '..', '..', '..'))
  })

  it('should return the current working directory when the process platform is not "win32"', () => {
    const result = projectDirFromPlatform()
    expect(result).toBe(process.cwd())
  })

  it('should return a valid directory path', () => {
    const result = projectDirFromPlatform()
    const regex =
      process.platform === 'win32'
        ? /^(?:[A-Z]:\\|\/)(?:[^\/\\:*?"<>|\r\n]+[\/\\])*[^\/\\:*?"<>|\r\n]*$/i
        : /^(?:\/[^\/\0]+)*\/?$/
    expect(result).toMatch(regex)
  })

  it('should return a string', () => {
    const result = projectDirFromPlatform()
    expect(typeof result).toBe('string')
  })

  it('should not throw any errors', () => {
    expect(() => {
      projectDirFromPlatform()
    }).not.toThrow()
  })
})
