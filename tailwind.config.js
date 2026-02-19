/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                slate: {
                    950: '#020617',
                },
                primary: '#3B82F6',   // blue-500
                secondary: '#60A5FA', // blue-400
                accent: '#F97316',    // orange-500
            },
            fontFamily: {
                sans: ['DM Sans', 'sans-serif'],
                display: ['Space Grotesk', 'sans-serif'],
            },
            backgroundImage: {
                'hero-glow': 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.15), rgba(2, 6, 23, 0))',
            }
        },
    },
    plugins: [],
}
