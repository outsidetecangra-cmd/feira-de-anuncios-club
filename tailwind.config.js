/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#10233f",
        sale: "#f59e0b",
        local: "#0f766e",
      },
      boxShadow: {
        soft: "0 16px 50px rgba(16, 35, 63, 0.12)",
      },
    },
  },
  plugins: [],
};
