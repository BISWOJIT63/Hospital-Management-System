/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				'primary': '#10B981',
				'secondary': '#065F46',
				'medical-bg': '#FFFFFF',
				'medical-dark': '#1F2937',
				'glass-border': 'rgba(16, 185, 129, 0.2)'
			},
			fontFamily: {
				'sans': [
					'Plus Jakarta Sans',
					'sans-serif'
				]
			}
		}
	},
	plugins: [require('tailwind-scrollbar-hide')],
}
