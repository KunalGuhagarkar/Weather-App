# Weather App

A small React app that shows the weather for any city you search for. It displays a three-day view (yesterday, today and tomorrow) with the temperature, wind speed, chance of rain and general conditions for each day.

Weather data comes from the [Visual Crossing Timeline Weather API](https://www.visualcrossing.com/weather-api).

This project is a solution to the [roadmap.sh Weather App project](https://roadmap.sh/projects/weather-app).

## Features

- Search for a city or location by typing it in and clicking **Submit** or pressing **Enter**
- Starts with an approximate location guessed from your browser's time zone
- Three-day view: yesterday, today (highlighted) and tomorrow
- For each day: date, average temperature (°F), wind speed, rain chance and conditions
- Shows a loading message while data is being fetched

## Tech Stack

- [React](https://react.dev/) 19
- [Vite](https://vite.dev/) 8
- JavaScript (JSX) and plain CSS
- ESLint
- [Framer Motion](https://motion.dev/) (installed as a dependency)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) and npm
- A free API key from [Visual Crossing](https://www.visualcrossing.com/weather-api)

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

5. Open the local URL printed in the terminal (usually `http://localhost:5173`).

The `.env` file is already listed in `.gitignore`, so your key will not be committed.

### Available Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the Vite development server    |
| `npm run build`   | Create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint`    | Run ESLint                           |

## Usage

1. Open the app. It loads weather for a location guessed from your time zone (for example, `Kolkata` for `Asia/Kolkata`).
2. Type a city into the search box, such as `Mumbai` or `London`.
3. Click **Submit** or press **Enter**.
4. Read the yesterday, today and tomorrow cards.

## How It Works

`App.jsx` holds the search input and the current location in state. When a location is set, it renders `WeatherCard`, which requests the data from Visual Crossing whenever the location changes:

```
https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/{location}/yesterday/tomorrow?unitGroup=us&key=YOUR_API_KEY&contentType=json
```

The `unitGroup=us` parameter means temperatures are in °F and wind speed is in mph.

## Project Structure

```
Weather-App/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── components/
│   │   └── WeatherCard.jsx          # Fetches data and renders the three day cards
│   ├── styles/
│   │   └── style-weather-card.css   # Styles for the weather card
│   ├── App.jsx                      # Search bar and location state
│   ├── App.css                      # App layout and search styles
│   ├── index.css                    # Global styles
│   └── main.jsx                     # React entry point
├── eslint.config.js
├── index.html
├── package.json
└── vite.config.js
```

## Author

Kunal Guhagarkar ([@KunalGuhagarkar](https://github.com/KunalGuhagarkar))

## Acknowledgements

- Project idea from [roadmap.sh](https://roadmap.sh/projects/weather-app)
- Weather data provided by [Visual Crossing](https://www.visualcrossing.com/)