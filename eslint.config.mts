import eslintConfigCityssm from 'eslint-config-cityssm'
import tseslint, { type Config } from 'typescript-eslint'

export default tseslint.config(...eslintConfigCityssm, {
  languageOptions: {
    parserOptions: {
      project: ['./tsconfig.json', './tsconfig.linting.json']
    }
  },
  rules: {
    'no-secrets/no-secrets': 'off',
    'sonarjs/new-cap': 'off'
  }
}) as Config
