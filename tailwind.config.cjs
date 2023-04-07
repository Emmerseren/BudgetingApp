/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
       "accent": "var(--accent)",
      },
      boxShadow: {
        'custom': ' 2px 2px 4px 0px inset,  -2px -2px 4px 1px inset',
        'customTwo': '0px -60px 36px -28px inset',
        'customThree': '0px 5px 15px -12px inset, 0px 18px 36px -18px inset',
        'customFour': ' 0px 1px 2px 0px, 0px 2px 6px 2px ',

      }
    },
  },
  plugins: [],
}