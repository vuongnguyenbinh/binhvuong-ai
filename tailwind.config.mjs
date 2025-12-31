/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}"],
  darkMode: "class",

  theme: {
    extend: {
      colors: {
        "bv-red": {
          DEFAULT: "#DA251D",
          hover: "#EF4444",
          light: "#FEF2F2",
        },
        charcoal: {
          DEFAULT: "#1E1E2A",
          light: "#27272A",
        },
      },

      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },

      animation: {
        "float-1": "float1 4s ease-in-out infinite",
        "float-2": "float2 5s ease-in-out infinite",
        slide: "slide 9s ease-in-out infinite",
      },

      keyframes: {
        float1: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-8px) rotate(2deg)" },
        },
        float2: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-10px) rotate(-2deg)" },
        },
        slide: {
          "0%, 30%": { transform: "translateX(0)" },
          "33%, 63%": { transform: "translateX(calc(-100%/3 - 8px))" },
          "66%, 96%": { transform: "translateX(calc(-200%/3 - 16px))" },
          "100%": { transform: "translateX(0)" },
        },
      },
    },
  },

  plugins: [require("@tailwindcss/typography")],
};
