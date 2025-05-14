/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        'warm-white': '#F0F0F0',
      },
      animation: {
        grid: "grid 15s linear infinite",
      },
      keyframes: {
        grid: {
          "0%": { transform: "translateY(-50%)" },
          "100%": { transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [
    function({ addUtilities }: { addUtilities: any }) {
      const newUtilities = {
        '.scrollbar-hide': {
          /* Firefox */
          'scrollbar-width': 'none',
          /* Safari and Chrome */
          '&::-webkit-scrollbar': {
            display: 'none'
          },
          /* IE and Edge */
          '-ms-overflow-style': 'none'
        },
      }
      addUtilities(newUtilities)
    }
  ]
};
