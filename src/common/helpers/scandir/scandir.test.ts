import path from 'node:path'
import { readdir, rmdir, symlink, unlink, writeFile } from 'node:fs/promises'
import { Dirent } from 'node:fs'
import os from 'node:os'

import { scandir } from '@/common/helpers/scandir'

describe('scandir', () => {
  beforeEach(() => {
    vi.mock('node:fs/promises')
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  // Tests that scandir yields nothing when the directory is empty
  it('should yield nothing when directory is empty', async () => {
    const emptyDir = './test/empty'
    const generator = scandir(emptyDir)
    const result = await generator.next()

    expect(result.done).toBe(true)
  })

  // Tests that scandir yields all file paths in a directory
  it('should yield all file paths in a directory', async () => {
    const directoryPath = path.resolve('test-directory')
    const expectedFiles = [
      {
        name: directoryPath + '/file1.txt',
        isDirectory: () => false,
      },
      {
        name: directoryPath + '/file2.txt',
        isDirectory: () => false,
      },
      {
        name: directoryPath + '/subdirectory/file3.txt',
        isDirectory: () => false,
      },
    ]

    vi.mocked(readdir).mockResolvedValue(expectedFiles as Dirent[])

    const files = []
    for await (const file of scandir(directoryPath)) {
      files.push(file)
    }

    expect(files).toEqual(expectedFiles.map((file) => file.name))
  })

  // Tests that scandir yields nothing when directory does not exist
  it('should not yield anything when directory does not exist', async () => {
    const nonExistentDir = path.resolve('non-existent-directory')
    const generator = scandir(nonExistentDir)
    const result = await generator.next()
    expect(result.done).toBe(true)
  })

  // Tests that scandir does not yield anything when encountering a broken symlink
  it('should not yield anything when encountering a broken symlink', async () => {
    const directoryPath = path.join(os.tmpdir(), 'scandir-test')
    const tmpFile = path.join(directoryPath, 'file.txt')

    await writeFile(tmpFile, '')
    const symlinkPath = path.join(directoryPath, 'symlink.txt')
    await symlink(symlinkPath, tmpFile)
    const generator = scandir(directoryPath)
    const result = await generator.next()

    expect(result.done).toBe(true)
    expect(result.value).toBeUndefined()

    await unlink(symlinkPath)
    await unlink(tmpFile)
    await rmdir(directoryPath)
  })

  // Tests that scandir handles errors thrown by readdir
  it('should catch and log errors thrown by readdir', async () => {
    const directoryPath = path.resolve('test-directory')
    const expectedError = new Error('readdir error')

    vi.mocked(readdir).mockRejectedValue(expectedError)

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(vi.fn())

    const files = []
    for await (const file of scandir(directoryPath)) {
      files.push(file)
    }

    expect(files).toEqual([])
    expect(consoleSpy).toHaveBeenCalledWith(expectedError)

    consoleSpy.mockRestore()
  })
})
