import { defineConfig } from 'vitest/config'
import tscConfigPaths from 'vitest-tsconfig-paths'

export default defineConfig({
  test: {
    globals: true,
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
  },
  plugins: [tscConfigPaths()],
})
