/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "selector",
  theme: {
    extend: {
      screens: {
        sm: "567px",
        md: "767px",
        lg: "992px",
        xl: "1200px",
        "2xl": "1400px",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      colors: {
        mainColor: "#2563eb",
        lighttheme: "#f8f9fe",
        darktheme: "#181824",
        darkthemeSec: "#25273c",
        lighttext: "#61616b",
        darktext: "#8c91b7",
        hoverColor: "#3b82f6",
      },
      boxShadow: {
        cardFill: "0 0 0 1000px #f8f9fe",
      },
      keyframes: {
        myPing: {
          "75%,100%": { transform: "scale(2);", opacity: "0" },
        },
      },
      animation: {
        myPing: "myPing 300ms ease-in-out",
      },
    },
  },
  plugins: [],
};
