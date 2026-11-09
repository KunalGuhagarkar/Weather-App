import { useState } from "react";
import "./App.css";

import FetchWeatherData from "./components/FetchWeatherData";

function App() {
    const [location, setLocation] = useState("");
    const [showWeather, setShowWeather] = useState("");

    

    function locationClickHandler() {
        setShowWeather(location);
    }


    return (
        <div className="app-container">
            <div className="search-bar">
                <input
                    type="text"
                    name="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
                <button onClick={locationClickHandler}>Submit</button>
            </div>

            {showWeather && <FetchWeatherData location={showWeather} />}
        </div>
    );
}

export default App;
