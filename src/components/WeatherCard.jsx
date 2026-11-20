import { useEffect, useState } from "react";

import "../styles/style-weather-card.css";

export default function WeatherCard({ location }) {
    const [weatherData, setWeatherData] = useState();
    const dayLabels = ["Yesterday", "Today", "Tomorrow"];

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await fetch(
                    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/yesterday/tomorrow?unitGroup=metric&key=${import.meta.env.VITE_WEATHER_API_KEY}&contentType=json`,
                );

                const data = await response.json();
                setWeatherData(data);
                console.log(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchWeather();
    }, [location]);

    if (!weatherData)
        return <p className="weather-card__loading">Weather Loading...</p>;

    return (
        <div className="weather-card">
            <h1 className="weather-card__title">Weather Card</h1>
            <p className="weather-card__location">
                Input location is: <strong>{location}</strong>
            </p>

            <div className="weather-card__days">
                {weatherData.days.map((day, index) => (
                    <div
                        key={index}
                        className={`weather-day ${index === 1 ? "weather-day--today" : ""}`}
                    >
                        <h3 className="weather-day__label">
                            {dayLabels[index]}
                        </h3>
                        <p className="weather-day__date">{day.datetime}</p>
                        <p className="weather-day__temp">{day.temp}°C</p>
                        <div className="weather-day__row">
                            <span>Windspeed</span>
                            <span>{day.windspeed}</span>
                        </div>
                        <div className="weather-day__row">
                            <span>Rain chance</span>
                            <span>{day.precipprob}%</span>
                        </div>
                        <p className="weather-day__conditions">
                            {day.conditions}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
