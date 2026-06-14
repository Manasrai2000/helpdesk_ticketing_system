/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{ts,tsx,js,jsx}',
    './components/**/*.{ts,tsx,js,jsx}',
    './starter/**/*.{ts,tsx,js,jsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#000000',
        'on-background': '#1b1b1d',
        'surface-bright': '#fcf8fa',
        'surface-container-lowest': '#ffffff',
        'outline-variant': '#c6c6cd',
        secondary: '#505f76',
        'secondary-container': '#d0e1fb',
        'primary-fixed': '#dae2fd',
        'on-primary': '#ffffff',
        'surface': '#fcf8fa',
        'surface-container': '#f0edef'
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        'container-padding': '16px',
        'card-gap': '12px'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        'geist-mono': ['Geist Mono', 'ui-monospace', 'SFMono-Regular']
      },
      fontSize: {
        'h1': ['24px', { lineHeight: '32px', fontWeight: '600' }],
        'h2': ['20px', { lineHeight: '28px', fontWeight: '600' }],
        'h3': ['18px', { lineHeight: '26px', fontWeight: '600' }],
        'body-sm': ['14px', { lineHeight: '20px' }],
        'body-lg': ['16px', { lineHeight: '24px' }]
      }
    }
  },
  plugins: []
}
