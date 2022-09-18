/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
<<<<<<< HEAD:client/tailwind.config.cjs
    './src/**/*.tsx',
    './index.html',
=======
    '.src/**/.tsx'
>>>>>>> 59c5b584e89e4f4c203514e55b950a1bf174c3ac:clientside/tailwind.config.cjs
  ],
  theme: {
    fontFamily: {
      sans: ['inter', 'sans-serif']
    },
    extend: {
      colors: {
      },
      backgroundImage: {
        galaxy: "url('./background-galaxy.png')",
        'nlw-gradient': 'linear-gradient(89.86deg, #9572FC 23.08%, #43E7AD 33.94%, #E1D55D 44.57%)',
        'game-gradient': 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 67.08%)',
      }
    },
  },
  plugins: [],
}
