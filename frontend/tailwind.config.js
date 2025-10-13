// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#a67c52",      // emas antik
        secondary: "#4b3b2f",    // coklat tua kayu
        accent: "#d4b483",       // highlight hangat
        background: "#faf7f2",   // krem lembut
        dark: "#1a1a1a",         // latar gelap
        light: "#fdfaf5",        // putih kekuningan
        muted: "#b8a88a",        // abu-coklat lembut
        border: "#e5decf",       // garis halus
      },
    },
  },
  plugins: [],
};
