import { useState } from 'react';
import Search from './components/search/search';
import './App.css';
import CurrentWeather from './components/current-weather/current-weather';
import Forecast from './components/forecast/forecast';
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";

function App() {
  const [currentWeather,setCurrentWeather]=useState(null);
  const [forecast,setForecast]=useState(null);
 
  const handleOnSearchChange=(searchData) => {
    
    //接受search传来的数据
    console.log(searchData);
    //获取经纬度
    const [lat,lon] = searchData.value.split(" ");
    const currentWeatherFetch=
    fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
    const forecastFetch=
    fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
    //获取天气
    Promise.all([currentWeatherFetch,forecastFetch] ).then(async(Response)=>{
      const weatherResponse = await Response[0].json();
      const forecastResponse=await Response[1].json();
      setCurrentWeather({city:searchData.label,...weatherResponse});
      setForecast({
      city:searchData.label,...forecastResponse});
    })
    .catch(console.log);
  }
    
   
  return (
    <div className="container">
     <Search onSearchChange={handleOnSearchChange}/>
    {currentWeather&&<CurrentWeather data={currentWeather}/>}
    {forecast&&<Forecast data={forecast}/>}
    </div>
  );
}

export default App;
