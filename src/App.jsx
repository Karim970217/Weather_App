import React, { useState } from 'react'
import { TbTemperatureSun } from "react-icons/tb";
import { WiHumidity, WiRain, WiCloud, WiSnow, WiThunderstorm } from "react-icons/wi";
import { IoLocationOutline } from "react-icons/io5";
import { FaWind } from "react-icons/fa6";
import { FiSun } from "react-icons/fi"; 

const App = () => {
  const [city, setCity] = useState()
  const [weather, setWeather] = useState()

  const fetchData = async (city) => {
    if (!city) {
      setWeather(null);
      alert("Enter a location");
      return;
    };
    const API_KEY = "6612a44223076556a75cb9b1af5b424b";
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    try {
      const response = await fetch(URL);
      const data = await response.json();
      if (!response.ok) {
        alert(data.message);
        return;
      }
      setWeather(data);
      console.log(data);
    }
    catch (error) {
      console.log("Error fetching weather data", error);
    }
  }

  const handleClick = () => {
    fetchData(city);
  }

  return (
    <div className='h-[100vh] flex justify-center items-center md:h-[100vh] bg-gradient-to-r from-yellow-400 to-orange-500 md:flex md:justify-center md:items-center'>
      <div className='h-[60vh] w-[80vw] flex flex-col items-center gap-[15px] md:h-[58vh] md:w-[50vw] bg-gradient-to-r from-teal-400 to-blue-500 md:flex md:flex-col md:items-center md:gap-[10px] rounded-3xl shadow-lg'>
        <input
          className='w-[80%] h-[35px] p-[10px] font-medium text-xl  md:w-[80%] md:h-[40px] rounded-3xl md:p-[20px] text-blue-700 md:font-semibold md:text-2xl mt-[30px] border-2 border-green-400'
          type="text"
          placeholder='Enter a location'
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          className='hover:bg-red-400 text-xl font-medium p-[4px] md:text-2xl border-2 border-green-500 rounded-3xl md:p-[6px] text-white bg-teal-500 md:font-semibold'
          onClick={handleClick}
        >
          Search Weather
        </button>
        
        {weather && (
          <>
            <div className='flex flex-col gap-[20px] mt-[10px]'>
              <div className='flex gap-[20px]'>
                <IoLocationOutline className='text-xl text-white' />
                <h1 className='text-white font-bold text-[20px] -mt-[6px]'>Location: {weather.name}</h1>
              </div>
              <div className='flex gap-[20px]'>
                <TbTemperatureSun className='text-xl text-white' />
                <p className='text-white font-bold text-[20px] -mt-[6px]'>Temperature: {weather.main.temp.toFixed()}°C</p>
              </div>
              <div className='flex gap-[20px]'>
                <WiHumidity className='text-xl text-white' />
                <h1 className='text-white font-bold text-[20px] -mt-[6px]'>Humidity: {weather.main.humidity}%</h1>
              </div>
              <div className='flex gap-[20px]'>
                <FaWind className='text-xl text-white' />
                <h1 className='text-white font-bold text-[20px] -mt-[6px]'>Wind Speed: {weather.wind.speed.toFixed()} km/h</h1>
              </div>

        
              <div className='flex gap-[20px]'>
                {
                  weather.weather[0].main === 'Clear' ? (
                    <FiSun className='text-4xl text-yellow-400' />
                  ) : weather.weather[0].main === 'Rain' ? (
                    <WiRain className='text-4xl text-blue-500' />
                  ) : weather.weather[0].main === 'Clouds' ? (
                    <WiCloud className='text-4xl text-gray-600' />
                  ) : weather.weather[0].main === 'Snow' ? (
                    <WiSnow className='text-4xl text-white' />
                  ) : weather.weather[0].main === 'Thunderstorm' ? (
                    <WiThunderstorm className='text-4xl text-yellow-600' />
                  ) : null
                }
              
              <h1 className='text-white font-bold text-[20px] mt-[3px]'>
                {weather.weather[0].description}
              </h1>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default App;
