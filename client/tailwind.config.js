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
                tGray: "#B3B3B3",
                textGray: "#DADADA",
                bg: "#292929",
                bgTooltip: "#282828",
                bgDashboard: "#1A1A1A",
                bgPlayingBar: "#181818",
                bgHeader: "#121212",
                brown: "#D2B48C",
                bgModal: "rgba(0, 0, 0, 0.4)",
                bgInput: "rgba(255, 255, 255, 0.1)",
            },
            backgroundImage: {
                auth: "url('../src/assets/images/bgImage.jpg')",
            },
            keyframes: {
                slip: {
                    "0%": {
                        opacity: 0,
                        transform: "translateX(-200px)",
                        backgroundColor: "transparent",
                    },
                    "100%": {
                        opacity: 1,
                        transform: "translateX(0)",
                    },
                },
                slideLeft: {
                    "0%": {
                        transform: "translateX(10%)",
                    },
                    "100%": {
                        transform: "translateX(-30%)",
                    },
                },
            },
            animation: {
                "auth-slip": "slip ease 1s",
                "slide-left": "slideLeft ease-out 3s infinite",
            },
        },
    },
    plugins: [],
    safelist: [
        {
            pattern: /bg-./,
        },
    ],
};
