/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        default: ["var(--font-mona-sans)", ...fontFamily.sans],
        sans: ["var(--font-mona-sans)", ...fontFamily.sans],
      },
      colors: {
        'twitter-purple': '#9c59b6',
        'twitter-darkGray': '#15202b',
        'twitter-extraLightGray': '#e1e8ed',
        'twitter-blue': '#1DA1F2',
        'twitter-green': '#17BF63'
      },
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
