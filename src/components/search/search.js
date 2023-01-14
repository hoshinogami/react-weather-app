import React,{useState} from "react";
import {AsyncPaginate} from "react-select-async-paginate"
import { geoApiOptions, GEO_API_URL } from "../../api";
//查找组件
const Search=({onSearchChange})=>{
    
     const [search,setSearch]=useState(null);

     const loadOptions=(inputValue)=>{
      //fetch发送页面请求
        return fetch(`${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
        geoApiOptions
        )
        //将返回数据转成json格式
        .then((response)=>response.json())
        .then((response)=>{
          //返回城市的经纬度，名字，国家
          return {
            options: response.data.map((city)=>{
              return {
                value:`${city.latitude} ${city.longitude}`,
                label:`${city.name},${city.countryCode}`,
              }
            })
          }
        })
    }
  //更改数据，并将数据传回父组件
    const handleOnChange=(searchData)=>{
      //更改搜索框的value值
      setSearch(searchData);
      onSearchChange(searchData);
    }
     return (
      <AsyncPaginate
      placeholder="Search for city"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
      />)
}
export default Search;