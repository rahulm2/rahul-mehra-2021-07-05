module.exports = {
  purge: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './ui-kit/**/*.{js,ts,jsx,tsx}',
    './assets/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      transitionProperty: {
        height: 'height'
      }
    },
    colors: {
      primary: '#fff',
      secondary: 'rgb(241, 241, 241)',
      inputBorder: '#E5E5E5',
      gray: '#BDBDBD',
      header: '#00206A',
      accent: '#1890ff',
      error: 'red',
      modalColor: 'rgba(0,0,0,0.5)'
    },
    fontSize: {
      xs: '.75rem',
      sm: '.875rem',
      tiny: '.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem'
    },
    screens: {
      md: '575px',
      lg: '1024px'
    },
    flex: {
      1: '1 1 0%',
      auto: '1 1 auto',
      initial: '0 1 auto',
      inherit: 'inherit',
      none: 'none',
      2: '2 2 0%',
      4: '4 4 0%'
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
