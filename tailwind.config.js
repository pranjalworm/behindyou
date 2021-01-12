module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {},
    fontFamily: {
      title: ['PT Sans', 'sans-serif'],
      body: ['Roboto', 'sans-serif'],
    },
    backgroundColor: theme => ({
      'white': '#fff'
    }),
    textColor: {
      'white': '#fff'
    }
  },
  variants: {},
  plugins: [],
}
