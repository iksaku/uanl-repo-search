module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/typescript'],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        indent: ['warn', 4],
        quotes: ['warn', 'single'],
        eqeqeq: 'warn'
    },
    parserOptions: {
        parser: '@typescript-eslint/parser'
    }
}