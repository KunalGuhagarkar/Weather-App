# Weather App

A React weather app that lets you search for any location and view its current conditions and a 7-day forecast. Built as a solution to the [roadmap.sh Weather App project](https://roadmap.sh/projects/weather-app).

> **Status:** 🚧 Work in progress. The core search and forecast are working; the remaining features are listed under [Future Improvements](#future-improvements).

## Features

- Search for any city or location using the input field
- Current conditions: temperature, "feels like" temperature, general conditions (Sunny, Cloudy, Rainy, etc.) and humidity
- 7-day forecast with the day's conditions and high/low temperatures
- Loading and error states while fetching data

Temperatures are shown in °F (the Visual Crossing default).

## Tech Stack

- [React](https://react.dev/) 19
- [Vite](https://vite.dev/) 8
- JavaScript (JSX)
- CSS
- ESLint
- [Visual Crossing Weather API](https://www.visualcrossing.com/weather-api)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) and npm
- A free Visual Crossing API key ([sign up here](https://www.visualcrossing.com/weather-api))

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/KunalGuhagarkar/Weather-App.git
   cd Weather-App
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root and add your API key:

   ```env
   VITE_WEATHER_API_KEY=your_api_key_here
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL shown in the terminal (usually `http://localhost:5173`).

### Available Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the Vite development server    |
| `npm run build`   | Create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint`    | Run ESLint                           |

## Usage

1. Type a city or location into the search box (for example, `Mumbai` or `London, UK`).
2. Click **Submit**.
3. View the current conditions and the 7-day forecast for that location.

## API

Weather data comes from the Visual Crossing Timeline Weather API:

```
https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/{location}?key=YOUR_API_KEY
```

The API key is read from the `VITE_WEATHER_API_KEY` environment variable. Never commit your `.env` file; make sure it is listed in `.gitignore`.

## Project Structure

```
Weather-App/
├── public/
├── src/
│   ├── components/
│   │   └── FetchWeatherData.jsx   # Fetches and displays weather data
│   ├── App.jsx                    # Search bar and app state
│   ├── App.css                    # App and weather card styles
│   ├── index.css
│   └── main.jsx                   # React entry point
├── eslint.config.js
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Future Improvements

### Remaining project requirements

- [x] Show wind speed and chance of rain in the current conditions
- [x] Show the previous and next 24 hours (hourly view)
- [x] Add a refresh button to reload the weather outlook

### Stretch goals

- [x] Default to the user's current location (browser geolocation)
- [x] Add loading animations (for example, with Framer Motion) 

### Code cleanup

- [x] Move the API key into an environment variable and add `.env` to `.gitignore`
- [x] Encode the location in the request URL (`encodeURIComponent`)

## Acknowledgements

- Project idea from [roadmap.sh](https://roadmap.sh/projects/weather-app)
- Weather data from [Visual Crossing](https://www.visualcrossing.com/)

