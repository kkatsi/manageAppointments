module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    screens: {
      sm: "500px",
      md: "768px",
      lg: "1124px",
      xl: "1400px",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
