import flowbite from "flowbite-react/tailwind";

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
      "./app/**/*.{js,ts,jsx,tsx}",
      flowbite.content()
    ],
    theme: {
      extend: {
        colors: {
            background: 'var(--background)',
            foreground: 'var(--forground)'
        }
      },
    },
    plugins: [flowbite.plugin()],
  };
  