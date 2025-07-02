import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/**/*.{js,ts,jsx,tsx}',
        './app/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                vazir: ['var(--font-vazir)', 'sans-serif'],
            },
        },
    },
    plugins: [],
};

export default config;
