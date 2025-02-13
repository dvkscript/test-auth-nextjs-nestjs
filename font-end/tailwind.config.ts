import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'var(--background)',
  			foreground: 'var(--foreground)',
        default: 'var(--background)',
        tertiary: 'hsl(225 calc(1 * 6.25%) 12.549% / 1)',
        accent: 'hsl(234.935 calc(1 * 85.556%) 64.706% / 1)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
      keyframes: {
        'auth-intro': {
          '0%': { transform: 'translateY(-150%) translateX(-50%) scale(1.5)', opacity: '0' },
          '50%': { transform: 'translateY(-45%) translateX(-50%) scale(1)', opacity: '0.95' },
          '100%': { transform: 'translateY(-50%) translateX(-50%) scale(1)', opacity: '1' },
        },
      },
      animation: {
        'auth-intro': 'auth-intro 0.4s cubic-bezier(0.5, 1, 0.5, 1)',
      },
  	}
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
