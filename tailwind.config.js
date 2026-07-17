module.exports = {
  content: ["./index.html", "./app.js"],
  theme: {
    extend: {
      colors: {
        brand: {
          yellow: "#F5C842",
          "yellow-light": "#FFD96A",
          "yellow-pale": "#FFF8E1",
          "yellow-deep": "#D9A825",
          dark: "#3D3D3D",
          "dark-light": "#555555",
          "dark-deep": "#1A1A1A",
          "dark-surface": "#2A2A2A",
          orange: "#EA5533",
          "orange-light": "#FF7657",
          "orange-deep": "#C43E1E",
        },
        warm: {
          bg: "#FFFDF7",
          cream: "#FFF9EE",
          gray: "#F4F3F0",
        },
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      fontSize: {
        "2xs": "0.65rem",
      },
    },
  },
  plugins: [],
};
