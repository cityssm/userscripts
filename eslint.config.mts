import eslintConfigCityssm from 'eslint-config-cityssm'
import tseslint, { type Config } from 'typescript-eslint'

export default tseslint.config(...eslintConfigCityssm, {
  languageOptions: {
    parserOptions: {
      project: ['./tsconfig.json', './tsconfig.client.json']
    }
  },
  rules: {
    'no-secrets/no-secrets': 'off'
  }
}) as Config
