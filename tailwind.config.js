/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0f172a", // Warna gelap elegan BimaReview
        accent: "#2563eb", // Warna biru modern BimaReview
      }
    },
  },
  plugins: [],
}