import React, { useEffect,useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
// import clear_icon from '../assets/clear.png'
// import cloud_icon from '../assets/cloud.png'
// import drizzle_icon from '../assets/drizzle.png'
// import rain_icon from '../assets/rain.png'
// import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'
import humidity_icon from '../assets/humidity.png'


function Weather() {
  const inputRef=useRef()
  const[weatherData,setWeatherData]=useState(false);


  const search=async (city)=>{
    if(city===""){
      alert("Enter city name");
      return;
    }
    try{
      const url=`https://api.weatherapi.com/v1/current.json?key=7325e80c95144cd69a9180025243012&q=${city}&aqcity`;

      const response= await fetch(url);
      const data= await response.json();
      console.log(data);
      setWeatherData({
        humidity:data.current.humidity,
        windspeed:data.current.wind_kph,
        temperature:Math.floor(data.current.temp_c),
        location:data.location.name,
        img:data.current.condition.icon
      })

    }catch(erro){

    }
  }
    useEffect(()=>{
        search("gandhinagar");
    },[])

  return (
    <div className='weather'>
      <div className='search-bar'>
        <input ref={inputRef} type="text"placeholder='search'/>
        <img src={search_icon} alt="" onClick={()=>search(inputRef.current.value)}/>
      </div>
      <img src={weatherData.img} alt="" className='weather-icon'/>
      <p className='temperature'>{weatherData.temperature}°c</p>
      <p className='location'>{weatherData.location}</p>

      <div className='weather-data'>

        <div className="col">
          <img src={humidity_icon} alt=""/>
          <div>
            <p>{weatherData.humidity}%</p>
            <span>humidity</span>
          </div>
        </div>

        <div className="col">
          <img src={wind_icon} alt=""/>
          <div>
            <p>{weatherData.windspeed}km/h</p>
            <span>Wind Speed</span>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Weather
