
export default  {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend:
     {
      fontFamily: {
        shadows: ['shadows)'],
        bellota: ['bellota'],
      },
      backgroundImage: {
        'fade-to-black': 'linear-gradient(to bottom, transparent, black)',
      },
      
    },
  },
  plugins: [],
};
