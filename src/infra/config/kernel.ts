import { join } from 'node:path'

export function projectDirFromPlatform() {
  return process.platform === 'win32'
    ? join(__dirname, '..', '..', '..')
    : process.cwd()
}

export const KERNEL = {
  project_dir: projectDirFromPlatform(),
}
