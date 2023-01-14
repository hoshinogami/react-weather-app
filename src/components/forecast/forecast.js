import React ,{useState}from "react";
import { Accordion,AccordionItem,AccordionItemHeading,AccordionItemButton,AccordionItemPanel} from "react-accessible-accordion"
import "./forecast.css" ;
import {TRANSLATE_API_URL,TRANSLATE_API_KEY,TRANSLATE_API_ID} from "../../api"
import md5 from 'js-md5';
import fetchJSONP from 'fetch-jsonp'
import Description from "../Description/Description";
//import sleep from 'sleep';


const WEEK_DAYS=[ "Mon", "Tue", "Wed", "Thu","Fri", "Sat","Sun"]
const Forecast= ({data})=>{
    const[des,setDes]=useState(null);
     const dayInAWeek = new Date().getDay();
     const forecastDays=WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0,dayInAWeek));
  //    const dst=(item)=>{
  //     //let des1;
  //    // sleep.sleep(500);
  //    const salt = Math.round(Math.random(10000));
  //    const content=item.weather[0].description;
  //    let sign=TRANSLATE_API_ID+content+salt+TRANSLATE_API_KEY;
  //    sign=md5(sign);
  //    const translateurl=TRANSLATE_API_URL+'?appid=' + TRANSLATE_API_ID + '&q=' + content + '&from=en&to=zh&salt=' + salt + '&sign=' + sign;
  //   //  const des1=(prop)=>{
  //   //   console.log(prop);
  //   //   return prop.trans_result[0].dst;
  //   // }
  //  fetchJSONP(translateurl,{mode:'no-cors',
  //    credentials: 'include',
  //    method: 'GET',
  //    headers:{ Accept: 'application/json',},
  //    jsonCallbackFunction:'showLocation'},)
  //   //  Promise(description)
  //    .then(async(response) =>{
  //     const des=await response.json();
  //   //  console.log(des.trans_result[0].dst);
  //     //setDes(des.trans_result[0].dst||"11");
  //     //setDes("111");
  //     //return des.trans_result[0].dst;
  //       console.log(des);
  //     setDes({...des});
  //   })
  //   .catch(console.log);
     //console.log(des)
     //return des;
     //return des.trans_result[0].dst;
  
  //}
  // console.log(des);
    
     return (
      <>
      <label className="title">Daily</label>
      <Accordion allowZeroExpanded>
        {data.list.splice(0,7).map((item,idx)=>{
          //dst(item);
       return( <AccordionItem key={idx}>
          <AccordionItemHeading>
            <AccordionItemButton>
              <div className="daily-item">
                <img src={`icons/${item.weather[0].icon}.png`}
                className="icon-small"
                alt="weather"/>
                <label className="day">
                  {forecastDays[idx]}
                </label>
                {/* <label className="description">
                  { des&&<div>{des.trans_result[0].dst}</div>}
                </label> */}
                {des&&<Description data={des}/>}
                <label className="min-max">{Math.round(item.main.temp_max)}°C</label>
              </div>
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <div className="daily-details-grid">
              <div className="daily-details-grid-item">
                <label>Pressure:</label>
                <label>{item.main.pressure}</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Humidity:</label>
                  <label>{item.main.humidity}</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Clouds:</label>
                  <label>{item.clouds.all}%</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Wind speed:</label>
                  <label>{item.wind.speed} m/s</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Sea level:</label>
                  <label>{item.main.sea_level}m</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Feels like:</label>
                  <label>{item.main.feels_like}°C</label>
              </div>
            </div>
          </AccordionItemPanel>
        </AccordionItem>)
        })}
      </Accordion>
      </>
      )
}
export default Forecast;