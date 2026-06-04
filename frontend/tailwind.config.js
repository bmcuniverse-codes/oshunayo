/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#07111F',
        panel: '#101B2D',
        soft: '#16233A',
        cyanGlow: '#22D3EE',
        blueGlow: '#2563EB'
      },
      boxShadow: {
        calm: '0 20px 60px rgba(0,0,0,0.25)'
      }
    },
  },
  plugins: [],
}
