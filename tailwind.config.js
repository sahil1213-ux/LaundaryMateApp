

module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/screens/**/*.{js,jsx,ts,tsx}","./src/utils/**/*.{js,jsx,ts,tsx}","./src/components/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {

      textColor: {
        'amber': '#FFBF00', // Use 'amber' directly instead of 'text-amber'
      },
      backgroundColor: {
        'blue-color': "#0066b2" // Use 'blue-color' instead of 'bg-Blue-Color'
      },
    },
  },
  plugins: [],
}

