import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Animation presets for staggered forecast rows
const listVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function FetchWeatherData({ location }) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState(null);

    const fetchItems = useCallback(
        async (isRefreshClick = false) => {
            if (!location?.trim()) return;

            try {
                if (isRefreshClick) {
                    setIsRefreshing(true);
                } else {
                    setIsLoading(true);
                }
                setError(null);

                const response = await fetch(
                    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}/yesterday/tomorrow?unitGroup=metric&include=days,hours,current&key=${import.meta.env.VITE_WEATHER_API_KEY}`,
                );

                if (!response.ok) {
                    throw new Error(`HTTP Error: status ${response.status}`);
                }

                const result = await response.json();
                setData(result);
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setIsLoading(false);
                setIsRefreshing(false);
            }
        },
        [location],
    );

    useEffect(() => {
        fetchItems(false);
    }, [fetchItems]);

    return (
        <AnimatePresence mode="wait">
            {isLoading ? (
                <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{ padding: "20px", fontFamily: "sans-serif" }}
                >
                    Loading forecast details...
                </motion.div>
            ) : error ? (
                <motion.div
                    key="error"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                        padding: "20px",
                        color: "red",
                        fontFamily: "sans-serif",
                    }}
                >
                    <p>Error: {error}</p>
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => fetchItems(false)}
                    >
                        Try Again
                    </motion.button>
                </motion.div>
            ) : data ? (
                <motion.div
                    key={data.resolvedAddress} // Re-animates smoothly when location changes
                    className="weather-card"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                >
                    <h2>Weather for {data.resolvedAddress}</h2>

                    {/* Tactile Refresh Button */}
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => fetchItems(true)}
                        disabled={isRefreshing}
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                        }}
                    >
                        <motion.span
                            animate={{ rotate: isRefreshing ? 360 : 0 }}
                            transition={
                                isRefreshing
                                    ? {
                                          repeat: Infinity,
                                          duration: 0.8,
                                          ease: "linear",
                                      }
                                    : { duration: 0 }
                            }
                            style={{ display: "inline-block" }}
                        >
                            ↻
                        </motion.span>
                        {isRefreshing ? "Refreshing..." : "Refresh"}
                    </motion.button>

                    {/* Subtle pulse while refreshing data in background */}
                    <motion.div
                        className="current-conditions"
                        animate={{ opacity: isRefreshing ? 0.5 : 1 }}
                        transition={{ duration: 0.2 }}
                    >
                        <h3>Current Conditions</h3>
                        <p>
                            <strong>Temperature:</strong>{" "}
                            {data.currentConditions.temp}°C
                        </p>
                        <p>
                            <strong>Feels Like:</strong>{" "}
                            {data.currentConditions.feelslike}°C
                        </p>
                        <p>
                            <strong>Conditions:</strong>{" "}
                            {data.currentConditions.conditions}
                        </p>
                        <p>
                            <strong>Humidity:</strong>{" "}
                            {data.currentConditions.humidity}%
                        </p>
                        <p>
                            <strong>Windspeed:</strong>{" "}
                            {data.currentConditions.windspeed} km/h
                        </p>
                        <p>
                            <strong>Chance of Rain:</strong>{" "}
                            {data.currentConditions.precipprob}%
                        </p>
                    </motion.div>

                    <div className="forecast-section">
                        <h3>Yesterday, Today and Tomorrow Forecast</h3>
                        <motion.div
                            className="forecast-list"
                            variants={listVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {data.days.slice(0, 7).map((day) => (
                                <motion.div
                                    key={day.datetime}
                                    className="forecast-row"
                                    variants={itemVariants}
                                    whileHover={{ x: 4 }}
                                >
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
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
}
