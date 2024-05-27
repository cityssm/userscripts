import eslintConfigCityssm from 'eslint-config-cityssm'

export default [
  ...eslintConfigCityssm,
  {
    rules: {
      'no-secrets/no-secrets': 'off'
    }
  }
]
