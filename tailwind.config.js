/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        urbanBlue: '#1E3A8A', // azul fuerte tipo gym
        urbanWhite: '#F9FAFB',
        urbanGray: '#6B7280',
        urbanBlack: '#111827'
      },
      fontFamily: {
        urban: ['Poppins', 'sans-serif']
      }
    }
  },
  plugins: []
};
