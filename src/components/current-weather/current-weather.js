import React from "react";
import  "./current-weather.css";
import {TRANSLATE_API_URL,TRANSLATE_API_KEY,TRANSLATE_API_ID} from "../../api"
import md5 from 'js-md5';
import fetchJSONP from 'fetch-jsonp';
import { useState ,useEffect} from "react";
const CurrentWeather =({data})=>{
 const[city,setCity]=useState(null);
 const [description,setDescription]=useState(null);
 //let city;
 useEffect(()=>{
 const dst =async(item)=>{
    const salt = Math.round(Math.random(10000));
   const content=item;
   let sign=TRANSLATE_API_ID+content+salt+TRANSLATE_API_KEY;
   sign=md5(sign);
   const translateurl=TRANSLATE_API_URL+'?appid=' + TRANSLATE_API_ID + '&q=' + content + '&from=en&to=zh&salt=' + salt + '&sign=' + sign;
 
 let res= await fetchJSONP(translateurl,{mode:'no-cors',
   credentials: 'include',
   method: 'GET',
   headers:{ Accept: 'application/json',},
   jsonCallbackFunction:'showLocation'},)
 
   let  des=await res.json();
   setCity(des.trans_result[0].dst);
}
 dst(data.city)
 const dst1 =async(item)=>{
  const salt = Math.round(Math.random(10000));
 const content=item;
 let sign=TRANSLATE_API_ID+content+salt+TRANSLATE_API_KEY;
 sign=md5(sign);
 const translateurl=TRANSLATE_API_URL+'?appid=' + TRANSLATE_API_ID + '&q=' + content + '&from=en&to=zh&salt=' + salt + '&sign=' + sign;

//let des1;
 await fetchJSONP(translateurl,{mode:'no-cors',
 credentials: 'include',
 method: 'GET',
 headers:{ Accept: 'application/json',},
 jsonCallbackFunction:'showLocation'},)
 .then(async(response) =>{
  let des= await response.json();
  setDescription(des.trans_result[0].dst);
})
}

 dst1(data.weather[0].description)
},[data])
   
 return (
      <div className="weather">
        <div className="top">
          <div>
          <p className="city">{city}</p>
         
            <p className="weather-description">{description}</p>
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
                细节
              </span>
            </div>
            <div className="parameter-row">
            <span className="parameter-label">体感</span>
            <span className="parameter-value">
              {Math.round(data.main.feels_like)}°C
            </span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">风速</span>
            <span className="parameter-value">{data.wind.speed} m/s</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">湿度</span>
            <span className="parameter-value">{data.main.humidity}%</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">气压</span>
            <span className="parameter-value">{data.main.pressure} hPa</span>
          </div>
          </div>
          </div>
      </div>
  )
}
export default CurrentWeather;