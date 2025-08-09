/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#2260FF",
          50:  "#EEF2FF",
          100: "#E0E7FF",
          200: "#C7D7FE",
          300: "#A5B4FC",
          400: "#809CFF",   // secondary-400
          500: "#4378FF",   // secondary-500
          600: "#2260FF",
          700: "#00278C",
          800: "#1E40AF",
          900: "#1E3A8A",
        },
        secondary: {
          DEFAULT: "#CAD6FF",
          100: "#ECF1FF",
          200: "#D4DDFF",
          300: "#A9BCFE",
          400: "#809CFF",
          500: "#4378FF",
        },
      },

      /* 1. League Spartan family  */
      fontFamily: {
        lsThin:      ["LeagueSpartan-Thin",     "sans-serif"],
        lsExtraLight:["LeagueSpartan-ExtraLight","sans-serif"],
        lsLight:     ["LeagueSpartan-Light",    "sans-serif"],
        lsRegular:   ["LeagueSpartan-Regular",  "sans-serif"],
        lsMedium:    ["LeagueSpartan-Medium",   "sans-serif"],
        lsSemiBold:  ["LeagueSpartan-SemiBold", "sans-serif"],
        lsBold:      ["LeagueSpartan-Bold",     "sans-serif"],
        lsBlack:     ["LeagueSpartan-Black",    "sans-serif"],
      },
    },
  },
  plugins: [],
};
