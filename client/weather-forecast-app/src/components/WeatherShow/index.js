import './index.css'
import {useState,useEffect} from 'react'
import SearchDataContext from '../../context/SearchDataContext'

const WeatherShow=()=>{
    return (
        <SearchDataContext.Consumer>
            {value=>{
                const {searchData}=value
                const cityName= (searchData)
                const getWeatherDetails= async()=>{
                    const url=`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=4325feebfd2b3a0940c931a05477254c`
                    const response=await fetch(url)
                    const data=await response.json()
                    console.log(data)
                    console.log("called")
                }
                getWeatherDetails()

                return (
                    <div>
                        <h1>Weather Report...</h1>
                    </div>
                )
            }}
        </SearchDataContext.Consumer>
    )
}

export default WeatherShow