import { readdir } from 'node:fs/promises'
import path from 'node:path'

export async function* scandir(
  directoryPath: string
): AsyncGenerator<string, void, void> {
  try {
    const files = await readdir(directoryPath, { withFileTypes: true }) || []

    for (const file of files) {
      const fullPath = path.resolve(directoryPath, file.name)

      if (file.isDirectory()) {
        yield* scandir(fullPath)
      } else {
        yield fullPath
      }
    }
    
  } catch (error) {
    console.error(error)
  }
}
