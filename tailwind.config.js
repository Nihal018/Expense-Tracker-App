/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/RecentScreen.tsx",
    "./components/ExpenseItem.tsx",
    "./components/Header.tsx",
    "./components/ExpenseList.tsx",
    "./<custom directory>/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
