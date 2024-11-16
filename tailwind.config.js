/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                primaryBG: '#F1D4B3',
                secondary: '#262626',
                btnPrimary: '#473A2B',
                btnHover: '#322618',
                borderColor: 'rgba(0,0,0,0.08)',
            },
            fontFamily: {
                montserrat: ['Montserrat'],
                poppins: ['Poppins'],
            },
            letterSpacing: {
                tightest: '-40px',
            },
            spacing: {
                '9/10': '90%',
                '19/20': '95%',
            },
        },
    },
    plugins: [],
};
