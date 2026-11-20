import { useState } from "react";
import "./App.css";

import WeatherCard from "./components/WeatherCard";

function App() {
    const [temp, setTemp] = useState("");
    const [location, setLocation] = useState("");

    function submitLocationClickHandler() {
        setLocation(temp);
    }

    return (
        <div className="app">
            <h1 className="app__title">Welcome to Weather API Project</h1>

            <div className="app__search">
                <input
                    className="app__input"
                    type="text"
                    placeholder="Enter a city..."
                    value={temp}
                    onChange={(e) => setTemp(e.target.value)}
                    onKeyDown={(e) =>
                        e.key === "Enter" && submitLocationClickHandler()
                    }
                />
                <input
                    className="app__button"
                    type="submit"
                    value="Submit"
                    onClick={submitLocationClickHandler}
                />
            </div>

            {location && <WeatherCard location={location} />}
        </div>
    );
}

export default App;
