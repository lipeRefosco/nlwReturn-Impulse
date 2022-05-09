module.exports = {
  content: ["./src/**/*.{html,tsx}"],
  theme: {
    extend: {
      color: {
        brand: {
          300: '#996DFF',
          500: '#8257E5',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
