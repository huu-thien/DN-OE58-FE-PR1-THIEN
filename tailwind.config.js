/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        slide: "url('./assets/images/decorate/slide2.jpg')",
      },
    },
  },
  plugins: [],
};
