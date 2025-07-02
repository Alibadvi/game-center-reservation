import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        vazir: ['var(--font-vazir)'],
      },
    },
  },
  plugins: [],
}
export default config;
