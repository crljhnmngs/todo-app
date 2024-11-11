/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                primaryBG: '#F1D4B3',
                secondary: '#262626',
            },
            fontFamily: {
                montserrat: ['Montserrat'],
                poppins: ['Poppins'],
            },
            letterSpacing: {
                tightest: '-40px',
            },
        },
    },
    plugins: [],
};
