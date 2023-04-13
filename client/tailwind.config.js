/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                inter: ["Inter", "sans-serif"],
            },
            colors: {
                primary: "#000",
                secondary: "rgb(83, 83, 83)",
                btn: "#1ED760",
                tGray: "#B3B3B3"
            },
            backgroundImage: {
                auth: "url('../src/assets/images/bgImage.jpg')",
            },
            keyframes: {
              slip: {
                from: {
                  opacity: 0,
                  marginLeft: '320px',
                },
                to: {
                  opacity: 1,
                  marginLeft: '450px',
                }
              }
            },
            animation: {
              'auth-slip': 'slip linear .3s'
            }
        },
    },
    plugins: [],
};
