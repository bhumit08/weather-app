import React, { useEffect, useRef, useState } from 'react';
import './Weather.css';
import search_icon from '../assets/search.png';
import wind_icon from '../assets/wind.png';
import humidity_icon from '../assets/humidity.png';

function Weather() {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(null);

  const search = async (city) => {
    if (city === '') {
      alert('Enter city name');
      return;
    }
    try {
      const url = `https://api.weatherapi.com/v1/current.json?key=7325e80c95144cd69a9180025243012&q=${city}&aqi=yes`;
      const response = await fetch(url);
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather:', error);
    }
  };

  useEffect(() => {
    search('Gandhinagar');
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      search(inputRef.current.value);
    }
  };

  return (
    <div className="weather">
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder="Search City" onKeyDown={handleKeyDown} />
        <img src={search_icon} alt="Search" onClick={() => search(inputRef.current.value)} />
      </div>

      {weatherData && weatherData.current && (
        <>
          <img src={weatherData.current.condition.icon} alt="weather" className="weather-icon" />
          <p className="temperature">{weatherData.current.temp_c}°C</p>
          <p className="location">{weatherData.location.name}, {weatherData.location.country}</p>

          <div className="weather-data">

            <div className="col">
              <img src={humidity_icon} alt="Humidity" />
              <div>
                <p>{weatherData.current.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>

            <div className="col">
              <img src={wind_icon} alt="Wind" />
              <div>
                <p>{weatherData.current.wind_kph} km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>

            <div className="col">
              <div>
                <p>{weatherData.current.feelslike_c}°C</p>
                <span>Feels Like</span>
              </div>
            </div>

            <div className="col">
              <div>
                <p>{weatherData.current.uv}</p>
                <span>UV Index</span>
              </div>
            </div>

            <div className="col">
              <div>
                <p>{weatherData.current.vis_km} km</p>
                <span>Visibility</span>
              </div>
            </div>

          </div>
        </>
      )}
    </div>
  );
}

export default Weather;
