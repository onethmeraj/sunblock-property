/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "var(--navy)",
        navy2: "var(--navy2)",
        copper: "var(--copper)",
        "copper-dark": "var(--copper-dark)",
        orange: "var(--orange)",
        orange2: "var(--orange2)",
        gold: "var(--gold)",
        paper: "var(--paper)",
        panel: "var(--panel)",
        peach: "var(--peach)",
        sky: "var(--sky)",
        mint: "var(--mint)",
        ink: "var(--ink)",
        muted: "var(--muted)",
        line: "var(--line)",
      },
      fontFamily: {
        display: "var(--font-display)",
        sans: "var(--font-sans)",
      },
      maxWidth: { container: "1160px" },
    },
  },
  plugins: [],
};
