import eslintConfigCityssm from 'eslint-config-cityssm';
export default [
    ...eslintConfigCityssm,
    {
        languageOptions: {
            parserOptions: {
                project: ['./tsconfig.json', './tsconfig.client.json']
            }
        },
        rules: {
            'no-secrets/no-secrets': 'off'
        }
    }
];
