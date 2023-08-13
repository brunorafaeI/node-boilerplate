import { defineConfig } from "vitest/config"
import tscConfigPaths from "vitest-tsconfig-paths"

export default defineConfig({
  test: {
    coverage: {
      reporter: ['text', 'json', 'html'],
    }
  },
  plugins: [tscConfigPaths()],
})
