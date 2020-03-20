const plugin = require('tailwindcss/plugin')
const defaultConfig = require('tailwindcss/defaultConfig')

module.exports = {
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', ...defaultConfig.theme.fontFamily.sans]
            }
        }
    },
    variants: {
        cursor: [...defaultConfig.variants.cursor, 'disabled'],
        opacity: [...defaultConfig.variants.opacity, 'disabled']
    },
    plugins: [
        require('@tailwindcss/custom-forms'),

        plugin(function ({ addVariant, e }) {
            addVariant('hocus', ({ modifySelectors, separator }) => {
                modifySelectors(({ className }) => {
                    return `.${e(`hocus${separator}${className}`)}:hover,.${e(`hocus${separator}${className}`)}:focus`
                })
            })
        })
    ]
}
