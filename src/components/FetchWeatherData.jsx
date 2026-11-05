import { useEffect, useState } from "react";

export default function FetchWeatherData({ location }) {
    const [data, setData] = useState([]);
    const [isloading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const response = await fetch(
                    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}`,
                );

                if (!response.ok) {
                    throw new Error(`HTTP Error: status ${response.status}`);
                }

                const result = await response.json();
                console.log(result);
                setData(result);
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchItems();
    }, [location]);

    if (isloading) {
        return (
            <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
                Loading forecast details...
            </div>
        );
    }

    if (error) {
        return (
            <div
                style={{
                    padding: "20px",
                    color: "red",
                    fontFamily: "sans-serif",
                }}
            >
                Error: {error}
            </div>
        );
    }

    if (!data) return null;

    return (
        <div className="weather-card">
            <h2>Weather for {data.resolvedAddress}</h2>

            <div className="current-conditions">
                <h3>Current Conditions</h3>
                <p>
                    <strong>Temperature:</strong> {data.currentConditions.temp}
                    °F
                </p>
                <p>
                    <strong>Feels Like:</strong>{" "}
                    {data.currentConditions.feelslike}°F
                </p>
                <p>
                    <strong>Conditions:</strong>{" "}
                    {data.currentConditions.conditions}
                </p>
                <p>
                    <strong>Humidity:</strong> {data.currentConditions.humidity}
                    %
                </p>
            </div>

            <div className="forecast-section">
                <h3>7-Day Forecast</h3>
                <div className="forecast-list">
                    {data.days.slice(0, 7).map((day) => (
                        <div key={day.datetime} className="forecast-row">
                            <div>
                                <div className="forecast-date">
                                    {day.datetime}
                                </div>
                                <span className="forecast-desc">
                                    {day.conditions}
                                </span>
                            </div>
                            <div className="forecast-temps">
                                <span className="temp-chip high">
                                    Hi: {day.tempmax}°
                                </span>
                                <span className="temp-chip low">
                                    Lo: {day.tempmin}°
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
