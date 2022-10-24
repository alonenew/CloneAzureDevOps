/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      width: {
        '21': '84px',
        '65': '259px',
      },
      maxWidth: {
        'xss': '320px',
      },
      height: {
        '95': '100vh',
      },
      fontSize: {
        'xss': '.55rem',
        'pxx': '9px',
      },
      backgroundImage: {
        '404': "url('../src/assets/images/404.png')",
        'tailwind': "url('../src/assets/images/docs-dark@tinypng.1bbe175e.png')",
      }
    }
  },
  plugins: [],
}
