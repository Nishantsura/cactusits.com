import type { PluginAPI } from "tailwindcss/plugin";

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        "warm-white": "#F0F0F0",
      },
      animation: {
        grid: "grid 15s linear infinite",
        "pulse-slow": "pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "pulse-slow-reverse":
          "pulse 10s cubic-bezier(0.4, 0, 0.6, 1) infinite reverse",
        float: "float 12s ease-in-out infinite",
      },
      keyframes: {
        grid: {
          "0%": { transform: "translateY(-50%)" },
          "100%": { transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(-6deg)" },
          "50%": { transform: "translateY(-20px) rotate(-2deg)" },
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }: PluginAPI) {
      const newUtilities = {
        ".scrollbar-hide": {
          /* Firefox */
          "scrollbar-width": "none",
          /* Safari and Chrome */
          "&::-webkit-scrollbar": {
            display: "none",
          },
          /* IE and Edge */
          "-ms-overflow-style": "none",
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
