module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      raleway: ['Raleway', 'sans-serif'],
      montserrat:['Montserrat', 'san-serif'],
      inter:['Inter','san-serif'],
    },
    extend: {
      colors: {
        primary: "#05b6d3",
        secondary: "#ef863e",
      },
    },
  },
  plugins: [],
};
