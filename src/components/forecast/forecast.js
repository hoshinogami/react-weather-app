import React ,{useState,useEffect} from "react";
import { Accordion,AccordionItem,AccordionItemHeading,AccordionItemButton,AccordionItemPanel} from "react-accessible-accordion"
import "./forecast.css" ;
import {TRANSLATE_API_URL,TRANSLATE_API_KEY,TRANSLATE_API_ID} from "../../api"
import md5 from 'js-md5';
import fetchJSONP from 'fetch-jsonp'
import Description from "../Description/Description";


const WEEK_DAYS=[ "星期一", "星期二", "星期三", "星期四","星期五", "星期六","星期天"]
const Forecast= ({data})=>{
  console.log(data);
    const[des,setDes]=useState([]);
     const dayInAWeek = new Date().getDay();
     const forecastDays=WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0,dayInAWeek));
     
    useEffect(()=>{
      let res=new Array(7);
      const dst =(item,idx)=>{
        const salt = Math.round(Math.random(10000));
       const content=item;
       let sign=TRANSLATE_API_ID+content+salt+TRANSLATE_API_KEY;
       sign=md5(sign);
       const translateurl=TRANSLATE_API_URL+'?appid=' + TRANSLATE_API_ID + '&q=' + content + '&from=en&to=zh&salt=' + salt + '&sign=' + sign;
     
      res[idx]= fetchJSONP(translateurl,{mode:'no-cors',
       credentials: 'include',
       method: 'GET',
       headers:{ Accept: 'application/json',},
       jsonCallbackFunction:'showLocation'},)
        
      }
        data.list.slice(0,7).map((item,idx)=>{
              dst(item.weather[0].description,idx);
              
          })
         Promise.all(res).then(async(response)=>{
            for(let i=0;i<response.length;i++){
            let Response=await response[i].json();
             console.log(Response);
             setDes(des=>({...des,[i]:Response.trans_result[0].dst

            }));
            }
            
          })
           
    },[data])
     return (
      <>
      <label className="title">预报</label>
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
                {des&&<Description data={des[idx]}/>}
                <label className="min-max">{Math.round(item.main.temp_max)}°C</label>
              </div>
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <div className="daily-details-grid">
              <div className="daily-details-grid-item">
                <label>气压:</label>
                <label>{item.main.pressure}</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>湿度:</label>
                  <label>{item.main.humidity}</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>云:</label>
                  <label>{item.clouds.all}%</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>风速:</label>
                  <label>{item.wind.speed} m/s</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>海平面:</label>
                  <label>{item.main.sea_level}m</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>体感:</label>
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