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
        "tertiary-fixed": "#fcdeb5",
        "on-tertiary-fixed": "#271901",
        "outline-variant": "#c6c6cd",
        "tertiary": "#000000",
        "on-secondary-fixed": "#0b1c30",
        "on-tertiary-container": "#98805d",
        "on-surface-variant": "#45464d",
        "on-background": "#1b1b1d",
        "surface-bright": "#fcf8fa",
        "primary-fixed": "#dae2fd",
        "tertiary-fixed-dim": "#dec29a",
        "on-secondary-fixed-variant": "#38485d",
        "on-secondary-container": "#54647a",
        "surface-container-high": "#eae7e9",
        "surface-container-low": "#f6f3f5",
        "primary": "#000000",
        "outline": "#76777d",
        "on-tertiary-fixed-variant": "#574425",
        "inverse-primary": "#bec6e0",
        "on-surface": "#1b1b1d",
        "on-primary-fixed-variant": "#3f465c",
        "background": "#fcf8fa",
        "on-tertiary": "#ffffff",
        "surface-tint": "#565e74",
        "on-primary-container": "#7c839b",
        "inverse-surface": "#303032",
        "on-primary-fixed": "#131b2e",
        "on-error": "#ffffff",
        "surface-container": "#f0edef",
        "inverse-on-surface": "#f3f0f2",
        "on-secondary": "#ffffff",
        "surface": "#fcf8fa",
        "on-error-container": "#93000a",
        "secondary-fixed-dim": "#b7c8e1",
        "secondary-container": "#d0e1fb",
        "primary-fixed-dim": "#bec6e0",
        "tertiary-container": "#271901",
        "surface-container-highest": "#e4e2e4",
        "secondary": "#505f76",
        "secondary-fixed": "#d3e4fe",
        "error": "#ba1a1a",
        "surface-dim": "#dcd9db",
        "on-primary": "#ffffff",
        "primary-container": "#131b2e",
        "surface-container-lowest": "#ffffff",
        "surface-variant": "#e4e2e4",
        "error-container": "#ffdad6"
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
