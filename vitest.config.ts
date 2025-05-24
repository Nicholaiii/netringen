import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    includeSource: ['server/**/*.test.ts', 'features/**/*.test.ts'],
  }
})
