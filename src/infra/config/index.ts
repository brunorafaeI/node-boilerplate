import path from 'node:path'

export const KERNEL = {
  project_dir:
    path.resolve(process.env.PWD!) || path.resolve(__dirname, '..', '..', '..'),
}
