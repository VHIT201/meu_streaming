/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/Home/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/FilmSlide/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        mainLight: '#FFFFFF',   // Màu cho main lúc light mode
        sidebarLight: '#F4F2F2', // Màu cho sidebar lúc light mode
        textLight: '#000000',
        mainDark: '#000000',     // Màu cho main lúc dark mode
        sidebarDark: '#1E1E1E',   // Màu cho sidebar lúc dark mode
        textDark: '#F4F2F2',
        mainRed:'#A81A4B'
      },
    },
  },
  plugins: [],
};
