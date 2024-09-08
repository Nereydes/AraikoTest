/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,tsx,ts}"],
	theme: {
		extend: {
			colors: {
				"yellow-light": "#ffd062",
				yellow: "#ffb403",
				"yellow-dark": "#bf8702",
				"green-light": "#bef682",
				green: "#a6d772",
				"green-dark": "#8fb962",
				"blue-light": "#6db3d0",
				blue: "#3c99c0",
				"blue-dark": "#2d7390",
				light: "#f5f3f5",
				dark: "#2c3038",
			},
		},
	},
	plugins: [require("tailwind-scrollbar")],
};
