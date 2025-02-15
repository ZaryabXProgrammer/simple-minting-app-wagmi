// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // For Next.js 13+ with /app directory
    "./pages/**/*.{js,ts,jsx,tsx,mdx}", // For Next.js 12 and below with /pages directory
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // If using /src directory
  ],
  theme: {
    extend: {
      colors: {
        themeBlue: "#0ea5e9",
      },
    },
  },
  plugins: [],
};
