/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			backgroundColor: {
				main: 'white',
			},
			colors: {},
		},
	},
	plugins: [require('@tailwindcss/line-clamp')],
}
