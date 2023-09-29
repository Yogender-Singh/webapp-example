import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Weather.css";
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";

const Weather = () => {
  const [weatherData, setWeatherData] = useState({});
  const location = useLocation();
  const username = new URLSearchParams(location.search).get("name");

  useEffect(() => {
    fetchWeather('Pune');
  }, []);

  const fetchWeather = async (city) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=f327a81a2a120fd158a88e9528340ec5`
    );
    if (!response.ok) {
      alert('No weather found.');
      throw new Error('No weather found.');
    }
    const data = await response.json();
    setWeatherData(data);
  };

  const displayWeather = (data) => {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
  };

  const search = () => {
    fetchWeather(document.querySelector(".search-bar").value);
  };

  return (
    <div className="weather">
      <Navbar />
      <h2 className="headingStyle">Hey {username}!!</h2>
      <div className="search">
        <input className="search-bar" type="text" />
        <button onClick={search}>Search</button>
      </div>
      {Object.keys(weatherData).length !== 0 ? (
        <div>
          <p className="city">Weather in {weatherData.name}</p>
          <img
            className="icon"
            src={`https://openweathermap.org/img/wn/${
              weatherData.weather[0].icon
            }.png`}
            alt=""
          />
          <p className="description">{weatherData.weather[0].description}</p>
          <p className="temp">Temp: {weatherData.main.temp}°C</p>
          <p className="humidity">Humidity: {weatherData.main.humidity}%</p>
          <p className="wind">Wind speed: {weatherData.wind.speed} km/h</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Weather;
