import dotenv from 'dotenv'
import fs from 'node:fs'
import path from 'node:path'
import { KERNEL } from '@/infra/config/kernel'
import { getEnv } from '@/common/libs/dotenv'

export const APP_ENV = getEnv('NODE_ENV', 'development')
const PROJECT_DIR = KERNEL.project_dir
export const checkEnvFile = (envPath: string) => {
  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath })
  }
}

// Load the environment files
checkEnvFile(path.resolve(PROJECT_DIR, `.env.${APP_ENV}`))
checkEnvFile(path.resolve(PROJECT_DIR, '.env.local'))
checkEnvFile(path.resolve(PROJECT_DIR, '.env'))