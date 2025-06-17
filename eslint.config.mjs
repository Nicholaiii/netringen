import antfu from '@antfu/eslint-config'
// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  antfu({
    ignores: ['*.json'],
    rules: {
      // https://github.com/sindresorhus/eslint-plugin-unicorn/issues/2654
      'unicorn/throw-new-error': ['off'],
      '@stylistic/space-before-function-paren': ['error', 'always'],
      'antfu/top-level-function': ['off'],
    },
  }),
)
