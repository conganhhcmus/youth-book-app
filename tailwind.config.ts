import type { Config } from 'tailwindcss';

export default {
    corePlugins: {
        container: false,
    },
    darkMode: 'class',
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#67EB64',
                secondary: '#A4FF2B',
            },
            backgroundImage: {
                gradient: 'linear-gradient(109.6deg, rgb(102, 203, 149) 11.2%, rgb(39, 210, 175) 98.7%)',
                header: "url('@/assets/backgrounds/header-bg.webp')",
                'search-icon': "url('@/assets/icons/search.webp')",
            },
        },
    },
    plugins: [
        function ({ addComponents }) {
            addComponents({
                '.container': {
                    maxWidth: '1200px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                },
            });
        },
    ],
} satisfies Config;
