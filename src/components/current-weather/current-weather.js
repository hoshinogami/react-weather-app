import React from "react";
import  "./current-weather.css";
import {TRANSLATE_API_URL,TRANSLATE_API_KEY,TRANSLATE_API_ID} from "../../api"
import md5 from 'js-md5';
import fetchJSONP from 'fetch-jsonp'
import { useState } from "react";
const CurrentWeather =({data})=>{
  const[city,setCity]=useState(null);
  const dst=(item)=>{
    
   const salt = Math.round(Math.random(10000));
   const content=item;
   let sign=TRANSLATE_API_ID+content+salt+TRANSLATE_API_KEY;
   sign=md5(sign);
   const translateurl=TRANSLATE_API_URL+'?appid=' + TRANSLATE_API_ID + '&q=' + content + '&from=en&to=zh&salt=' + salt + '&sign=' + sign;
 
  let des1;
 fetchJSONP(translateurl,{mode:'no-cors',
   credentials: 'include',
   method: 'GET',
   headers:{ Accept: 'application/json',},
   jsonCallbackFunction:'showLocation'},)
 
   .then(async(response) =>{
    const des=await response.json();
    des1=des;
      console.log(des);
  })
  .catch(console.log);
  
   return des1;
}

console.log( dst(data.city));
 return (
      <div className="weather">
        <div className="top">
          <div>
          <p className="city">{data.city}</p>
            <p className="weather-description">{data.weather[0].description}</p>
          </div>
          <img alt="weather" src={`icons/${data.weather[0].icon}.png`}/>
        </div>
        <div className="bottom">
          <p className="temperature">
              {Math.round(data.main.temp)}°C
          </p>
          <div className="details">
            <div className="parameter-row">
              <span className="parameter-label">
                Details
              </span>
            </div>
            <div className="parameter-row">
            <span className="parameter-label">Feels like</span>
            <span className="parameter-value">
              {Math.round(data.main.feels_like)}°C
            </span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Wind</span>
            <span className="parameter-value">{data.wind.speed} m/s</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Humidity</span>
            <span className="parameter-value">{data.main.humidity}%</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Pressure</span>
            <span className="parameter-value">{data.main.pressure} hPa</span>
          </div>
          </div>
          </div>
      </div>
  )
}
export default CurrentWeather;