import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      red: '#62150D',
      blue: '#1fb6ff',
      purple: '#7e5bef',
      pink: '#ff49db',
      orange: '#ff7849',
      green: '#13ce66',
      'light-ivory': '#FFFFF0',
      ivory: '#ffe8a0',
      yellow: '#ffc82c',
      'gray-dark': '#273444',
      gray: '#8492a6',
      'gray-light': '#d3dce6',
      'off-black': '#1B1111',
    },
    fontFamily: {
      sans: ['Germania One', 'helvetica', 'arial'],
      serif: ['Gelasio', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      screens: {
        sm: '640px',
        md: '800px',
        lg: '1024px',
        xl: '1200px',
      },
    },
  },
  plugins: [],
};
export default config;
