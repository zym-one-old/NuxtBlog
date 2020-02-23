/*
** TailwindCSS Configuration File
**
** Docs: https://tailwindcss.com/docs/configuration
** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
*/
module.exports = {
  theme: {
    extend: {
      colors: {
        nuxt: {
          darkGray: '#2F495E',
          gray: '#E6ECF1',
          stress: '#3498DB',
          mono: '#9DAAB6'
        }
      },
      fill: theme => ({
        'nuxt-darkGray': theme('colors.nuxt.darkGray'),
        'nuxt-gray': theme('colors.nuxt.gray'),
        'nuxt-stress': theme('colors.nuxt.stress'),
        'nuxt-mono': theme('colors.nuxt.mono')
      }),
      stroke: theme => ({
        'nuxt-darkGray': theme('colors.nuxt.darkGray'),
        'nuxt-gray': theme('colors.nuxt.gray'),
        'nuxt-stress': theme('colors.nuxt.stress'),
        'nuxt-mono': theme('colors.nuxt.mono')
      }),
      height: {
        14: '3.5rem'
      }
    }
  },
  variants: {},
  plugins: []
}
