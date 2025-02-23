import React, { useState} from 'react'
import { TbTemperatureSun } from "react-icons/tb";
import { WiHumidity } from "react-icons/wi";
import { IoLocationOutline } from "react-icons/io5";
import { FaWind } from "react-icons/fa6";

const App = () => {
  const [city,setCity]=useState()
  const [weather,setWeather]=useState()
  const fetchData=async(city)=>{
    if (!city)
    { 
      setWeather(null); 
      alert("enter a location")
      return
    };
    const API_KEY="6612a44223076556a75cb9b1af5b424b"
    const URL=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    try{
      const response=await fetch(URL)
    const data=await response.json()
    if(!response.ok){
      alert(data.message)
      return
    }
    setWeather(data)
    console.log(data)
    }
    catch (error) {
      console.log("Error fetching weather data", error);
    }
  }
  

  
  
 const handleClick=()=>{

  fetchData(city)
 }
  return (
    <div className='h-[100vh] bg-slate-600 flex justify-center items-center'>
      <div className='h-[50vh] w-[50vw] bg-blue-500 flex flex-col items-center gap-[10px]'>
        <input className='w-[80%] h-[40px] rounded-3xl p-[20px] text-2xl mt-[30px] border-2 border-green-400' type="text" placeholder='enter a location' value={city} onChange={(e)=>setCity(e.target.value)} />
        <button className='text-2xl border-2 border-green-500 rounded-3xl p-[6px] text-white bg-teal-400 font-semibold' onClick={handleClick}>search weather</button>
      {weather&&(<>
      <div className='flex flex-col gap-[20px] mt-[10px]'>

        <div className='flex gap-[20px]'>
        <IoLocationOutline className='text-xl text-red-500'/>
        <h1 className='text-red-500 font-bold text-[20px] -mt-[6px]'>Location : {weather.name}</h1>
        </div>
        <div className='flex gap-[20px]'>
        <TbTemperatureSun className='text-xl text-red-500'/>
        <p className='text-red-500 font-bold text-[20px] -mt-[6px]'>Temperature : {weather.main.temp.toFixed()}°c</p>
        </div>
        <div className='flex gap-[20px]'>
        <WiHumidity className='text-xl text-red-500'/>
        <h1 className='text-red-500 font-bold text-[20px] -mt-[6px]'>Humidity : {weather.main.humidity}%</h1>
        </div>
        <div className='flex gap-[20px]'>
        <FaWind className='text-xl text-red-500'/>
        <h1 className='text-red-500 font-bold text-[20px] -mt-[6px]'>wind speed : {weather.wind.speed.toFixed()}kmph</h1>
        </div>
        <h1 className='text-red-500 font-bold text-[20px] -mt-[6px]'>{weather.weather[0].description}
      
          
        </h1>
      </div>
      </>)}
      </div>
    </div>
  )
}

export default App