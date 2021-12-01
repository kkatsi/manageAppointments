module.exports = {
  balel: {
    plugins: ["babel-plugin-macros"],
  },
  style: {
    postcss: {
      plugins: [require("tailwindcss"), require("autoprefixer")],
    },
  },
};
