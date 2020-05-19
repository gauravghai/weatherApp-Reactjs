import React, { useEffect, useState, useCallback } from "react";

import AnimatedWeatherIcon from "./components/AnimatedWeather";
import { getWeatherByQuery } from "./utils";

export const Forcast = (props) => {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [weather, setWeather] = useState({});

  const search = useCallback(async (query) => {
    try {
      const weather = await getWeatherByQuery(query);
      setWeather(weather);
      setQuery("");
    } catch (err) {
      console.log("error", err);
      setWeather({});
      setQuery("");
      setError({ message: "Not Found", query });
    }
  }, []);

  useEffect(() => {
    search("Delhi");
  }, [search]);

  return (
    <div className="forecast">
      <AnimatedWeatherIcon className="forecast-icon" icon={props.icon} />
      <div className="today-weather">
        <h3>{props.weather}</h3>
        <form onSubmit={(e) => e.preventDefault() || search(query)} className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search any city"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />
          <button type="submit">Search</button>
        </form>
        <ul>
          {weather.main ? (
            <React.Fragment>
              <li className="cityHead">
                <p>
                  {weather.city}, {weather.country}
                </p>
                <img
                  alt={`weather icon ${weather.icon}`}
                  className="temp"
                  src={`https://openweathermap.org/img/wn/${weather.icon}.png`}
                />
              </li>
              <li>
                <span>Temperature </span>
                <span className="temp">
                  {weather.temperatureC}°c ({weather.main})
                </span>
              </li>
              <li>
                Humidity <span className="temp">{Math.round(weather.humidity)}%</span>
              </li>
              <li>
                Visibility <span className="temp">{Math.round(weather.visibility)} mi</span>
              </li>
              <li>
                Wind Speed <span className="temp">{Math.round(weather.speed)} Km/h</span>
              </li>
            </React.Fragment>
          ) : (
            <li>
              {error.query} {error.message}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Forcast;
