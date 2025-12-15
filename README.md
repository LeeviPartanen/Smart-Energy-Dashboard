# Smart Energy Dashboard


A clean, modern React + Vite web app that visualizes real-time electricity prices, weather data, and smart usage recommendations.


## Features
- 24-hour electricity price line chart (mock or API data)
- Live weather (Open-Meteo API, no key required)
- Simple recommendation engine (cheap / average / expensive)
- Automatic hourly refresh
- Responsive and visually clean UI built with TailwindCSS


## Getting Started
```bash
git clone <your-repo>
cd smart-energy-dashboard
npm install
npm run dev
```


### Optional: connect a real electricity price API
Create a `.env` file with:
```
VITE_PRICE_API_URL="https://api.energidataservice.dk/dataset/Elspotprices?..."
```
The helper in `src/utils/fetchElectricityPrice.js` already includes support for common response shapes.


## Deployment
Deploy to [Vercel](https://vercel.com/new) or [Netlify](https://app.netlify.com/) directly from GitHub.
Build command: `npm run build`
Output directory: `dist/`


## Tech Stack
- React + Vite
- TailwindCSS
- Axios
- Recharts
- Open-Meteo API (weather)


## License
MIT
