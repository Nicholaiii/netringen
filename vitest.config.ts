import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    includeSource: ['server/**/*.ts', 'features/**/*.ts'],
  },
  define: {
    'import.meta.vitest': 'undefined',
  },
})
